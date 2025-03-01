import os
import uuid
import uvicorn
import subprocess
from fastapi import FastAPI, File, UploadFile, HTTPException
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "renders"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_svg(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1].lower()

    # Ensure only SVG files are accepted
    if file_ext != "svg":
        raise HTTPException(status_code=400, detail="Only SVG files are supported.")

    file_id = str(uuid.uuid4())
    input_path = os.path.abspath(os.path.join(UPLOAD_DIR, f"{file_id}.svg"))
    output_path = os.path.abspath(os.path.join(OUTPUT_DIR, f"{file_id}.glb"))

    # Save the uploaded file
    with open(input_path, "wb") as buffer:
        buffer.write(await file.read())

    # Run Blender, capturing errors
    try:
        result = subprocess.run(
            [
                "blender", "--background", "--python", "blender_script.py", "--", input_path, output_path
            ],
            capture_output=True, text=True, check=True
        )
        print(result.stdout)  # Print Blender’s standard output
        print(result.stderr)  # Print Blender’s error output

    except subprocess.CalledProcessError as e:
        print("Blender failed:", e.stderr)
        raise HTTPException(status_code=500, detail=f"Blender failed: {e.stderr}")

    # Check if Blender actually generated the file
    if not os.path.exists(output_path):
        raise HTTPException(status_code=500, detail=f"Export failed: {output_path} not found.")

    return FileResponse(output_path, media_type="model/gltf-binary", filename="scene.glb")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
