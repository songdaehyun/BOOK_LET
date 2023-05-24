from rest_framework import serializers
from .models import BookInfoModel


class BookInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookInfoModel
        fields = '__all__'
