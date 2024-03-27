from faker import Faker
import random
import datetime

fake = Faker()

def generate_dummy_data(num_records):
    data = []
    for _ in range(num_records):
        video = {
            'user_id': random.randint(1, 100),  # Assuming user IDs exist up to 100
            'videoFile': fake.file_path(depth=1, category='video'),
            'thumbnail': fake.image_url(width=200, height=200),
            'title': fake.sentence(nb_words=4, variable_nb_words=True),
            'description': fake.paragraph(nb_sentences=4, variable_nb_sentences=True),
            'duration': random.randint(60, 600),  # Random duration between 1 minute and 10 minutes
            'views': random.randint(0, 1000000),  # Random views
            'isPublished': random.choice([True, False]),
            'created_at': fake.date_time_between(start_date='-1y', end_date='now', tzinfo=None),
            'updated_at': fake.date_time_between(start_date='-1y', end_date='now', tzinfo=None)
        }
        data.append(video)
    return data

dummy_data = generate_dummy_data(10)  # Generate 10 dummy records
for video in dummy_data:
    print(video)
