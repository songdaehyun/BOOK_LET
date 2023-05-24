from django.db import models

# Create your models here.

# book_title 추가 여부 검토


class BookInfoModel(models.Model):
    book_isbn = models.CharField(max_length=13, primary_key=True)  # ISBN(13자리)
    book_name = models.CharField(max_length=100)    # 책 이름
    book_image = models.CharField(max_length=300)   # 이미지 출처(URL)
    feeling = models.IntegerField(null=False, blank=False)

    class Meta:
        db_table = 'bookcover_recommend'
