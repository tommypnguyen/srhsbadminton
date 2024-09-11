import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv

load_dotenv()
config = cloudinary.config(secure=True)


def upload_image(file):
    result = cloudinary.uploader.upload(
        file,
        allowed_formats=["png", "jpg", "heic"],
        overwrite=False,
        folder="srhsBadminton",
    )
    print(result)
    return result["secure_url"], result["public_id"]


def delete_image(public_id):
    result = cloudinary.uploader.destroy(public_id, resource_type="image")
    return result
