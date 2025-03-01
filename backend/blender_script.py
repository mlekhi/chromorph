import bpy
import sys
import os
import bmesh

print("🔧 Blender script started...")

# Get input and output file paths
input_path = sys.argv[-2]
output_path = sys.argv[-1]  # expect a .glb extension

print(f"🔍 Input SVG: {input_path}")
print(f"📁 Output GLB: {output_path}")

# Clear all objects before importing
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# 🖼️ Load the SVG
bpy.ops.import_curve.svg(filepath=input_path)

# 🛠️ Debugging: List all objects & types
objects_in_scene = bpy.data.objects
print(f"📝 Objects in Scene: {[obj.name for obj in objects_in_scene]}")
print(f"🧐 Object Types: {[obj.type for obj in objects_in_scene]}")

# Ensure we have CURVE objects
imported_objects = [obj for obj in objects_in_scene if obj.type == 'CURVE']
if not imported_objects:
    raise RuntimeError("⚠️ No valid CURVE objects found after importing SVG.")
print(f"✅ Found {len(imported_objects)} Curve objects.")

# Ensure we're in OBJECT mode before conversion
if bpy.context.object and bpy.context.object.mode != 'OBJECT':
    bpy.ops.object.mode_set(mode='OBJECT')

# Make sure all curves are selected and set an active object
bpy.ops.object.select_all(action='DESELECT')
for obj in imported_objects:
    obj.select_set(True)
    if not bpy.context.view_layer.objects.active:
        bpy.context.view_layer.objects.active = obj

# Convert all CURVE objects to proper CURVES (to fix grouped paths)
print("🛠️ Ensuring proper curve format...")
with bpy.context.temp_override(
    active_object=bpy.context.view_layer.objects.active,
    selected_objects=imported_objects,
    object=bpy.context.view_layer.objects.active
):
    bpy.ops.object.convert(target='CURVE')
print("✅ Curve conversion complete!")

# Convert Curves to Mesh
print("🔄 Converting Curves to Mesh...")
bpy.ops.object.convert(target='MESH', keep_original=False)

# Separate by loose parts
mesh_objects = [obj for obj in bpy.data.objects if obj.type == 'MESH']
for obj in mesh_objects:
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.separate(type='LOOSE')
    bpy.ops.object.mode_set(mode='OBJECT')
    obj.select_set(False)
print("✅ Mesh separation complete!")

# Remove original curve objects from the scene (check by name)
for curve_obj in imported_objects:
    if curve_obj.name in bpy.data.objects:
        bpy.data.objects.remove(bpy.data.objects[curve_obj.name], do_unlink=True)

# Re-detect mesh objects after separation
mesh_objects = [obj for obj in bpy.data.objects if obj.type == 'MESH']
if not mesh_objects:
    raise RuntimeError("❌ Conversion to Mesh failed. No MESH objects detected.")
print(f"✅ Successfully converted and separated into {len(mesh_objects)} Mesh objects.")

# Rename and apply transforms to all mesh objects
for i, obj in enumerate(mesh_objects):
    obj.name = f"SVGMesh_{i}"
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    obj.select_set(False)

# Direct vertex manipulation for very small extrusion with detailed debug prints
for obj in mesh_objects:
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    
    # Print object dimensions
    dims = obj.dimensions
    print(f"{obj.name} dimensions: {dims}")
    
    # Enter Edit Mode and create a BMesh representation
    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(obj.data)
    bm.verts.ensure_lookup_table()  # Ensure the lookup table is up-to-date
    
    # Print coordinates of the first vertex before extrusion (if available)
    if len(bm.verts) > 0:
        print(f"{obj.name} first vertex before extrusion: {bm.verts[0].co[:]}")
    
    # Use a fixed very small extrusion value
    extrusion_value = 1e-6
    print(f"Using extrusion value: {extrusion_value} for {obj.name}")
    
    for v in bm.verts:
        v.co.z += extrusion_value
        
    bmesh.update_edit_mesh(obj.data)
    bpy.ops.object.mode_set(mode='OBJECT')
    
    # Print coordinates of the first vertex after extrusion
    if len(obj.data.vertices) > 0:
        print(f"{obj.name} first vertex after extrusion: {obj.data.vertices[0].co[:]}")
    
    obj.select_set(False)
print("✅ Extrusion Complete!")

# Add a solidify modifier to 'inflate' each mesh with a relative thickness value
for obj in mesh_objects:
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.modifier_add(type='SOLIDIFY')
    solid_mod = obj.modifiers["Solidify"]
    # Calculate thickness relative to the object's X dimension.
    thickness_value = obj.dimensions.x * 0.1  # Adjust the multiplier as needed
    print(f"{obj.name} dimensions.x: {obj.dimensions.x} => using solidify thickness: {thickness_value}")
    solid_mod.thickness = thickness_value
    bpy.ops.object.modifier_apply(modifier="Solidify")
    obj.select_set(False)
print("✅ Solidify Modifier Applied for 'Inflation'!")

# Clear materials and color data, then apply a chrome material to each mesh
print("🧹 Clearing existing materials and color data, then applying chrome...")
for obj in mesh_objects:
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    obj.data.materials.clear()

    if hasattr(obj.data, "vertex_colors"):
        while len(obj.data.vertex_colors) > 0:
            obj.data.vertex_colors.remove(obj.data.vertex_colors[0])
    if hasattr(obj.data, "color_attributes"):
        while len(obj.data.color_attributes) > 0:
            obj.data.color_attributes.remove(obj.data.color_attributes[0])
    obj.color = (1, 1, 1, 1)

    mat = bpy.data.materials.new(name="ChromeMaterial")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (1, 1, 1, 1)
    bsdf.inputs["Metallic"].default_value = 1
    bsdf.inputs["Roughness"].default_value = 0
    obj.data.materials.append(mat)

    obj.select_set(False)
print("✅ Chrome Material Applied to all mesh objects!")

# Export the entire scene as a GLB file
print("📦 Exporting scene as GLB...")
bpy.ops.export_scene.gltf(filepath=output_path, export_format='GLB')
print("✅ GLB Export Complete!")

print("🏁 Blender script finished.")
