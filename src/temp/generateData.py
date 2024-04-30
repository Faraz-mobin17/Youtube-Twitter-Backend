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


def generate_user_data(num_records):
    data = []
    for _ in range(num_records):
        username = fake.user_name()
        email = fake.email()
        firstname = fake.first_name()
        lastname = fake.last_name()
        avatar = fake.image_url()
        cover_image = fake.image_url()
        password = fake.password()
        
        users = {
            'username': username,
            'email': email,
            'firstname': firstname,
            'lastname': lastname,
            'avatar': avatar,
            'coverImage': cover_image,
            'password': password
        }
        data.append(users)
    return data


def generate_likes_data(num_records):
    data = []
    for _ in range(num_records):
        like = {
            'user_id': random.randint(1,20),
            'video_id': random.randint(1,20)
        }
        data.append(like)
    return data
# dummy_data = generate_dummy_data(10)  # Generate 10 dummy records
# for video in dummy_data:
#     print(video)

# user_data = generate_user_data(30)
# for user in user_data:
#     print(user)