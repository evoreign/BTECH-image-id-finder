import pandas as pd
import os
import time
from pymongo import MongoClient
client = MongoClient("mongodb+srv://kopi:kopi@cluster0.apqobqt.mongodb.net/?retryWrites=true&w=majority")
image_dict = {}
# Connect to your database
db = client["image_db"]

# Connect to your collection
collection = db["image_collection"]

while True:
    root_path = input("Enter the root path: ")
    list_of_models = os.listdir(root_path)
    print(list_of_models)
    confirmations = input("Are these the models you want to use? (y/n): ")
    if confirmations == "y":
        print("Great! Let's move on.")
        time.sleep(1)
        for model in list_of_models:
            print(f"Model: {model}")
            model_path = os.path.join(root_path, model)
            files = os.listdir(model_path)
            for file in files:
                print(f"File: {file}")
                file_path = os.path.join(model_path, file)
                cleaned_file_name = file.split(".")[0]
                # Open and read the Excel file
                df = pd.read_excel(file_path, sheet_name=cleaned_file_name)
                # Print the first 5 rows of the DataFrame
                image_list = df['Image'].dropna().tolist()
                # Convert the list of images to integers
                image_list = [int(i) for i in image_list]
                # Create a document for the model with the list of image IDs
                document = {"model": model, "image_id": image_list}
                # Insert the document into the collection
                collection.insert_one(document)
                print(f"model: {model}")
                print(f"list of image: {image_list}")
        confirmation_to_db = input("Do you want to save the image ID of this session to the database? (y/n): ")
        if confirmation_to_db == "y":
            print("The image ID of this session has been saved to the database.")
        else:
            continue
        # # Ask the user for an image ID
        # image_id = int(input("Enter an image ID: "))
        # # Print the models that contain the image ID
        # print(f"The image ID {image_id} is contained in the following models: {image_dict.get(image_id, 'None')}")
    else:
        continue