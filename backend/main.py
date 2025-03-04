import os
import uuid
import uvicorn
import subprocess
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import BaseModel
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

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USERNAME = os.getenv("EMAIL_USERNAME")
SMTP_PASSWORD = os.getenv("EMAIL_APP_PASSWORD") 
RECIPIENT_EMAIL = "maya.lekhi1@gmail.com"  

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

def send_contact_email(form_data: ContactForm):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USERNAME
    msg['To'] = RECIPIENT_EMAIL
    msg['Subject'] = f"New Contact Form Submission from {form_data.name}"

    body = f"""
    New contact form submission from Chromorph:

    Name: {form_data.name}
    Email: {form_data.email}

    Message:
    {form_data.message}
    """

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False

@app.post("/contact/")
async def submit_contact_form(form_data: ContactForm):
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        raise HTTPException(
            status_code=500,
            detail="Email configuration is missing. Please set EMAIL_USERNAME and EMAIL_APP_PASSWORD environment variables."
        )

    success = send_contact_email(form_data)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send email")

    return {"message": "Contact form submitted successfully"}

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
        print(result.stdout)  # Print Blender's standard output
        print(result.stderr)  # Print Blender's error output

    except subprocess.CalledProcessError as e:
        print("Blender failed:", e.stderr)
        raise HTTPException(status_code=500, detail=f"Blender failed: {e.stderr}")

    # Check if Blender actually generated the file
    if not os.path.exists(output_path):
        raise HTTPException(status_code=500, detail=f"Export failed: {output_path} not found.")

    return FileResponse(output_path, media_type="model/gltf-binary", filename="scene.glb")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
