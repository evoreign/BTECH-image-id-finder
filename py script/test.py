import pandas as pd
import os
import time
from pymongo import MongoClient

client = MongoClient("mongodb+srv://kopi:kopi@cluster0.apqobqt.mongodb.net/?retryWrites=true&w=majority")

# Connect to your database
db = client["image_db_test"]

# Connect to your collection
collection = db["image_collection_test"]
#test  changes git
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
            data_dict_all_files = {}  # Dictionary to hold data from all files for a model
            for file in files:
                print(f"File: {file}")
                file_path = os.path.join(model_path, file)
                cleaned_file_name = file.split(".")[0]
                # Open and read the Excel file
                df = pd.read_excel(file_path, sheet_name=cleaned_file_name)
                # Filter the DataFrame to only include rows where the 'Image' column is not null
                df = df[df['Image'].notna()]
                # Convert the 'Image' column to string
                df['Image'] = df['Image'].astype(str)
                # Convert all column names to string
                df.columns = df.columns.astype(str)
                # Replace NaN values with "-"
                df = df.fillna("-")
                # Create a dictionary where each key is the 'Image' field and the value is the rest of the row
                data_dict = df.set_index('Image').to_dict('index')
                data_dict_all_files.update(data_dict)  # Add data from this file to the dictionary for all files
            # Create a document for the model with the data dictionary
            document = {"model": model, "data": data_dict_all_files}
            # Insert the document into the collection
            collection.insert_one(document)
            print(f"model: {model}")
            print(f"data: {data_dict_all_files}")
        confirmation_to_db = input("Do you want to save the image ID of this session to the database? (y/n): ")
        if confirmation_to_db == "y":
            print("The image ID of this session has been saved to the database.")
        else:
            continue
    else:
        continue