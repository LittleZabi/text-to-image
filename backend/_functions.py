from _vars import ACCESS_TOKEN
import requests
import io
import random
from PIL import Image

def query(payload):
        API_URL = "https://api-inference.huggingface.co/models/SaiRaj03/Text_To_Image"
        headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.content
        
def requestPrompt(text): 
    image_bytes = query({
        "inputs": text
    })
    try:
        image = Image.open(io.BytesIO(image_bytes))
        name = '/images/' + str(random.randint(9999999, 99999999999)) + '.jpg';
        image.save(f'.{name}')
        return name 
    except Exception as e:
        print(e)
        return None