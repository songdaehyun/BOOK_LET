# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

setting = False

class Author(models.Model):
    author_id = models.BigAutoField(primary_key=True)
    author_name = models.CharField(max_length=32)

    class Meta:
        managed = setting
        db_table = 'author'


class Book(models.Model):
    book_isbn = models.CharField(primary_key=True, max_length=32)
    book_title = models.CharField(max_length=256)
    book_publisher = models.CharField(max_length=50)
    book_price = models.IntegerField()
    book_description = models.TextField()
    book_grade = models.FloatField()
    book_image = models.TextField(blank=True, null=True)
    author = models.ForeignKey(Author, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = setting
        db_table = 'book'


class BookCover(models.Model):
    book_cover_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    book_isbn = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_isbn')

    class Meta:
        managed = setting
        db_table = 'book_cover'


class BookGenre(models.Model):
    book_genre_id = models.BigAutoField(primary_key=True)
    book_isbn = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_isbn')
    genre = models.ForeignKey('Genre', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = setting
        db_table = 'book_genre'


class BookLikes(models.Model):
    book_like_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    book_isbn = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_isbn')

    class Meta:
        managed = setting
        db_table = 'book_likes'


class Comment(models.Model):
    comment_id = models.BigAutoField(primary_key=True)
    created_date = models.DateTimeField(blank=True, null=True)
    modified_date = models.DateTimeField(blank=True, null=True)
    comment_content = models.CharField(max_length=255)
    comment_depth = models.IntegerField()
    comment_group = models.BigIntegerField()
    paragraph = models.ForeignKey('Paragraph', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = setting
        db_table = 'comment'


class Follow(models.Model):
    follow_id = models.BigAutoField(primary_key=True)
    follower = models.ForeignKey('User', models.DO_NOTHING, db_column='follower', blank=True, null=True, related_name="follower")
    following = models.ForeignKey('User', models.DO_NOTHING, db_column='following', blank=True, null=True, related_name="followee")

    class Meta:
        managed = setting
        db_table = 'follow'


class Genre(models.Model):
    genre_id = models.BigAutoField(primary_key=True)
    genre_name = models.CharField(max_length=32)

    class Meta:
        managed = setting
        db_table = 'genre'


class Hashtag(models.Model):
    hashtag_id = models.BigAutoField(primary_key=True)
    hashtag_name = models.TextField(db_collation='utf8mb4_0900_ai_ci')
    hashtag_p_score = models.FloatField()
    hashtag_n_score = models.FloatField()

    class Meta:
        managed = setting
        db_table = 'hashtag'


class Paragraph(models.Model):
    paragraph_id = models.BigAutoField(primary_key=True)
    created_date = models.DateTimeField(blank=True, null=True)
    modified_date = models.DateTimeField(blank=True, null=True)
    book_isbn = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_isbn')
    paragraph_color = models.CharField(max_length=30)
    paragraph_content = models.CharField(max_length=301)
    paragraph_page = models.IntegerField()
    scrap_count = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    paragraph_score = models.IntegerField()
    paragraph_score_type = models.CharField(max_length=301)

    class Meta:
        managed = setting
        db_table = 'paragraph'


class Review(models.Model):
    review_id = models.BigAutoField(primary_key=True)
    review_content = models.CharField(max_length=255, blank=True, null=True)
    review_grade = models.FloatField()
    user = models.ForeignKey('User', models.DO_NOTHING)
    book_isbn = models.ForeignKey(Book, models.DO_NOTHING, db_column='book_isbn')
    created_date = models.DateTimeField(blank=True, null=True)
    modified_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = setting
        db_table = 'review'


class Scrap(models.Model):
    scrap_id = models.BigAutoField(primary_key=True)
    paragraph = models.ForeignKey(Paragraph, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = setting
        db_table = 'scrap'


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    email = models.CharField(unique=True, max_length=64)
    username = models.CharField(unique=True, max_length=32)
    nickname = models.CharField(unique=True, max_length=32)
    password = models.CharField(max_length=128)
    user_type = models.IntegerField(blank=True, null=True)
    user_role = models.IntegerField(blank=True, null=True)
    age = models.IntegerField()
    sex = models.IntegerField()
    prefer_score = models.IntegerField(blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    prefer_type = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = setting
        db_table = 'user'


class UserHashtag(models.Model):
    user_hashtag_id = models.BigAutoField(primary_key=True)
    hashtag = models.ForeignKey(Hashtag, models.DO_NOTHING)
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        managed = setting
        db_table = 'user_hashtag'


class UserImage(models.Model):
    user_image_id = models.BigAutoField(primary_key=True)
    created_date = models.DateTimeField(blank=True, null=True)
    modified_date = models.DateTimeField(blank=True, null=True)
    image_path = models.TextField()
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        managed = setting
        db_table = 'user_image'
