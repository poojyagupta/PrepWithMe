from fastapi import FastAPI, File, UploadFile #helps with file uploads in API requests.
import easyocr 
import shutil #used to copy fil-like objects efficiently
import os 

app = FastAPI() #creating fastapi app instance, 'app' will be used to define routes
reader = easyocr.Reader(['en','hi']) #initializing an easyocr reader for english and hindi

@app.post("/extract-text/") #defining api endpoint using 'app'

async def extract_text(file: UploadFile = File(...)): #func for handling file uploads. 
    with open("temp.png", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = reader.readtext("temp.png", detail=0) #reads images for text and returns without bounding boxes

    os.remove("temp.png") #free the space up
    return {"extracted_text": result}
    
