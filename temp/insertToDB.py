import mysql.connector
from generateData import generate_dummy_data
# Connect to your MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="toor",
    database="youtube"
)

# Create a cursor object to execute SQL queries
cursor = db.cursor()

# Function to insert dummy data into the database
def insert_dummy_data(data):
    for video in data:
        query = """INSERT INTO Videos (user_id, videoFile, thumbnail, title, description, duration, views, isPublished, created_at, updated_at) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        values = (video['user_id'], video['videoFile'], video['thumbnail'], video['title'], video['description'], video['duration'], video['views'], video['isPublished'], video['created_at'], video['updated_at'])
        cursor.execute(query, values)
        db.commit()  # Commit the transaction

# Generate dummy data
dummy_data = generate_dummy_data(10)

# Insert dummy data into the database
insert_dummy_data(dummy_data)

# Close the cursor and database connection
cursor.close()
db.close()
