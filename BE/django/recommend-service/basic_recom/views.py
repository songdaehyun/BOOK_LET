from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
import re
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer, HashingVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from surprise import Dataset, Reader, KNNWithMeans, KNNBasic
from konlpy.tag import Okt
import json
from django.conf import settings
from django.http.response import JsonResponse, HttpResponse
from .models import Userr, Review, BookLikes, Book, Genre, BookGenre, Paragraph, Scrap
import random
from django.db import connection
import statistics
from django.db.models import Q, F, FloatField, Value
from django.db.models.functions import Abs





# Create your views here.


@api_view(['GET'])
def insert_db(request):
    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'author_df.xlsx')
    # 엑셀 파일을 데이터프레임으로 변환
    df_author = pd.read_excel(excel_file_path) 
    df_author.reset_index(inplace=True, drop=True)

    cursor = connection.cursor()

    for index, row in df_author.iterrows():
        author_name = row['book_author']
        author_id = row['index'] + 1
        query = "INSERT INTO author (author_name, author_id) VALUES (%s, %s)"
        cursor.execute(query, (author_name, author_id))

    connection.commit()

    cursor.close()

    a = {'결과' : 'DB에 잘 들어갔습니다.' }

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')


@api_view(['GET'])
def insert_db2(request):
    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'book_author_df.xlsx')
    # 엑셀 파일을 데이터프레임으로 변환
    df = pd.read_excel(excel_file_path) 
    df.reset_index(inplace=True, drop=True)

    cursor = connection.cursor()

    for index, row in df.iterrows():
        book_isbn = row['book_isbn']
        author_id = row['book_author'] + 1
        book_author_id = index + 1
        query = "INSERT INTO book_author (book_author_id, author_id, book_isbn) VALUES (%s, %s, %s)"
        cursor.execute(query, (book_author_id, author_id, book_isbn))

    connection.commit()

    cursor.close()

    a = {'결과' : 'DB에 잘 들어갔습니다.' }

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')


@api_view(['GET'])
def insert_db3(request):
    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'book_info_df.xlsx')
    # 엑셀 파일을 데이터프레임으로 변환
    df = pd.read_excel(excel_file_path, keep_default_na=False, na_values=['']) 
    df.reset_index(inplace=True, drop=True)
    df = df.fillna('')

    cursor = connection.cursor()

    for index, row in df.iterrows():
        book_isbn = row['book_isbn']
        book_title = row['book_title']
        book_publisher = row['book_publisher']
        book_price = row['book_price']
        book_description = row['book_description']
        book_grade = row['book_grade']
        book_image = row['book_cover']
        query = "INSERT INTO book (book_isbn, book_title, book_publisher, book_price, book_description, book_grade, book_image) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (book_isbn, book_title, book_publisher, book_price, book_description, book_grade, book_image))

    connection.commit()

    cursor.close()

    a = {'결과' : 'DB에 잘 들어갔습니다.' }

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')



@api_view(['GET'])
def insert_db4(request):
    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'category_df.xlsx')
    # 엑셀 파일을 데이터프레임으로 변환
    df = pd.read_excel(excel_file_path) 
    df.reset_index(inplace=True, drop=True)

    cursor = connection.cursor()

    for index, row in df.iterrows():
        genre_id = row['index'] + 1
        genre_name = row['book_category']
        query = "INSERT INTO genre (genre_id, genre_name) VALUES (%s, %s)"
        cursor.execute(query, (genre_id, genre_name))

    connection.commit()

    cursor.close()

    a = {'결과' : 'DB에 잘 들어갔습니다.' }

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')


@api_view(['GET'])
def insert_db5(request):
    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'book_category_df.xlsx')
    # 엑셀 파일을 데이터프레임으로 변환
    df = pd.read_excel(excel_file_path) 
    df.reset_index(inplace=True, drop=True)

    cursor = connection.cursor()

    for index, row in df.iterrows():
        book_isbn = row['book_isbn']
        genre_id_id = row['book_category'] + 1
        book_genre_id = index + 1
        query = "INSERT INTO book_genre (book_isbn, genre_id_id, book_genre_id) VALUES (%s, %s, %s)"
        cursor.execute(query, (book_isbn, genre_id_id, book_genre_id))

    connection.commit()

    cursor.close()

    a = {'결과' : 'DB에 잘 들어갔습니다.' }

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')
    

@api_view(['POST'])
def like_book(request):
    
    user_id = request.data.get('user_id')
    user = Userr.objects.get(user_id=user_id)
    liked_books = BookLikes.objects.filter(user_id=user.user_id)

    if not liked_books:
        b = {'recom_list' : "좋아요한 책이 없어서 추천을 할 수 없습니다.",
             'result' : False}
        return Response(data=b, status=200, content_type='application/json')
    
    random_book = random.choice(liked_books)
    
    # 엑셀 파일 경로 지정
    # excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'df_book.xlsx')
    # print(excel_file_path)

    # 엑셀 파일을 데이터프레임으로 변환
    # df_content = pd.read_excel(excel_file_path) 

    # df_content.reset_index(inplace=True, drop=True)
    # df_content['index'] = [i for i in range(df_content.shape[0])]

    books = Book.objects.all()
    df_content = pd.DataFrame(list(books.values('book_isbn', 'book_description')))
    df_content.reset_index(inplace=True, drop=True)
    df_content['index'] = [i for i in range(df_content.shape[0])]

    

    def content(book_isbn):
        #isbn은 int로
        book_isbn = str(book_isbn)
        
        index = df_content[df_content['book_isbn'] == book_isbn]['index'].values[0]
        
        # # 책 소개 전처리
        # okt = Okt()
        summary_filtered = []
        for i in df_content['book_description']:       
            i = re.sub("[^ㄱ-ㅎㅏ-ㅣ가-힣]+", " ", i)
            # i = okt.nouns(i)
            # i = " ".join(i)
            summary_filtered.append(i)

            
        df_content['book_description'] = summary_filtered   
        cv = TfidfVectorizer()
        count_matrix = cv.fit_transform(df_content['book_description'])
        cosine_sim = cosine_similarity(count_matrix)

        sim_books = list(enumerate(cosine_sim[index]))
        sorted_sim_books = sorted(sim_books,key=lambda x:x[1],reverse=True)[1:11]
        return sorted_sim_books
    
    final_result = []
    for i in content(random_book.book_isbn.book_isbn):
        final_result.append(int(df_content.loc[df_content['index'] == i[0], 'book_isbn'].iloc[0]))


    a = {'recom_list' : final_result,
         'result' : True}

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')
    
   

    
@api_view(['POST'])
def star_book(request):

    user_id = request.data.get('user_id')
    user = Userr.objects.get(user_id=user_id)
    user_email = user.email
    reviewed_books = Review.objects.filter(user_id=user.user_id)

    if not reviewed_books:
        b = {'recom_list' : "리뷰평가가 없어서 추천을 할 수 없습니다.",
             'result' : False}
        return Response(data=b, status=200, content_type='application/json')

    #isbn은 int로
    tmp_data = []
    for obj in reviewed_books:
        tmp_data.append({'isbn':int(obj.book_isbn.book_isbn),'book': 'songD', 'id': user_email,'star': obj.review_grade})
    tmp_df = pd.DataFrame(tmp_data)
    
    # 엑셀 파일 경로 지정
    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'df_star.xlsx')
    # 엑셀 파일을 데이터프레임으로 변환
    df_star = pd.read_excel(excel_file_path)

    #데이터 프레임 합치기
    df_star = pd.concat([df_star, tmp_df])

    # Surprise 라이브러리에서 사용할 데이터셋 형태로 변환
    reader = Reader(rating_scale=(0.5, 5))
    data = Dataset.load_from_df(df_star[["id", "isbn", "star"]], reader)


    # 유저 기반 협업 필터링 수행
    sim_options = {
        "name": "cosine",
        "user_based": True,  # Compute  similarities between users
    }


    trainingSet = data.build_full_trainset()
    algo = KNNWithMeans(sim_options=sim_options)
    algo.fit(trainingSet)
    
    # #특정 유저가 이미 읽은 책 목록
    filterd_df = df_star.loc[df_star['id'] == user_email]
    
    # #유저가 읽지 않은 책 목록
    no_user_read = df_star.loc[~df_star['isbn'].isin(filterd_df['isbn'])]['isbn'].unique()


    #추천 목록
    predictions = []
    for book_id in no_user_read:
        predictions.append((book_id, algo.predict(user_email, book_id).est))
    
    predictions.sort(key=lambda x: x[1], reverse=True)
    

    final_result = []
    for i in predictions[5:15]:
        final_result.append(int(i[0]))
    
    a = {'recom_list' : final_result,
         'result' : True}

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')



@api_view(['POST'])
def category_book(request):
    user_id = request.data.get('user_id')
    user = Userr.objects.get(user_id=user_id)
    liked_books = BookLikes.objects.filter(user_id=user.user_id)

    if not liked_books:
        b = {'recom_list' : "좋아요한 책이 없어서 추천을 할 수 없습니다.",
             'result' : False}
        return Response(data=b, status=200, content_type='application/json')
    
    user_liked_list = []
    isbn_list = []
    for i in liked_books:
        book_isbn = i.book_isbn
        book = BookGenre.objects.get(book_isbn = book_isbn)
        book_genre_id = book.genre_id
        user_liked_list.append(book_genre_id)
        isbn_list.append(book_isbn)

    user_most_genre = statistics.mode(user_liked_list)
    books1 = BookGenre.objects.filter(genre_id = user_most_genre)

    books2 = books1.exclude(Q(book_isbn__in=isbn_list))

    if len(books2) < 5:
        books = books1
    else:
        books = books2

    # QuerySet을 리스트로 변환
    book_list = list(books)
    # 랜덤으로 10개의 책 뽑기
    random_books = random.sample(book_list, 10)

    result = []
    for j in random_books:
        result.append(j.book_isbn.book_isbn)
    
    
    a = {'recom_list' : result,
         'result' : True }

    # DRF Response 객체 생성
    return Response(data=a, status=200, content_type='application/json')


    # 유저가 좋아요한 책들 가져온뒤 가장 많이 읽은 카테고리 를 찾은뒤,  그 카테고리 책들중에서 랜덤 추천?
    # 엑셀 파일 경로 지정
    # excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'df_book.xlsx')
    # 엑셀 파일을 데이터프레임으로 변환
    # df_category = pd.read_excel(excel_file_path)



    # df_category.reset_index(inplace=True, drop=True)
    # df_category['index'] = [i for i in range(df_category.shape[0])]

    
    # def category(user_like_list):
    
    #     input_categories = ''
    #     for i in user_like_list:
    #         category = df_category[df_category['isbn'] == i]['category'].values[0]
    #         input_categories = input_categories + category
            
    #     okt = Okt()
        
    #     input_category = re.sub("[^ㄱ-ㅎㅏ-ㅣ가-힣]+", " ", input_categories)
    #     input_category = okt.nouns(input_category)
    #     input_category = " ".join(input_category)
        
    #     if input_category == '':
    #         input_category = '카테고리'
        
    #     cv1 = CountVectorizer(token_pattern=r"(?u)\b\w+\b")
    #     count_matrix = cv1.fit_transform([input_category])
    #     words_count = count_matrix.toarray()
    #     max_index = words_count.argmax()
    #     user_most_category = cv1.get_feature_names_out()[max_index]
        
    #     filtered_category = df_category['category'].values.tolist()
    #     # for i in df_category['category']:
    #     #     if i != '없음':
    #     #         i = re.sub("[^ㄱ-ㅎㅏ-ㅣ가-힣]+", " ", i)
    #     #         i = okt.nouns(i)
    #     #         i = " ".join(i)
    #     #     else:
    #     #         i = '카테고리'
    #     #     filtered_category.append(i)   
            
    #     filtered_category.append(input_category)
    #     cv = CountVectorizer(token_pattern=r"(?u)\b.+?\b")
    #     count_matrix = cv.fit_transform(filtered_category)
        
    #     cosine_sim = cosine_similarity(count_matrix)
    #     sim_books = list(enumerate(cosine_sim[len(cosine_sim) - 1]))
    #     sorted_sim_books = sorted(sim_books,key=lambda x:(-x[1], -x[0]))[1:6]

    #     return [user_most_category, sorted_sim_books]

    # a = category(user_liked_list)
    # main_category = a[0]
    # tmp_result = a[1]
    # print(main_category)
    # print(tmp_result)

    # final_result = []
    # for i in tmp_result:
    #     final_result.append(int(df_category.loc[df_category['index'] == i[0], 'isbn'].iloc[0]))
    
    # a = {'main_category' : main_category, 'recom_list' :final_result}
    
    # # DRF Response 객체 생성
    # return Response(data=a, status=200, content_type='application/json')





@api_view(['POST'])
def profile_book(request):

    user_id = request.data.get('user_id')
    user = Userr.objects.get(user_id=user_id)

    gender = user.sex
    age = user.age
    age = (int(age) // 10) * 10

    if age < 10:
        age = 10
    elif age > 50:
        age = 50

    if gender == 1:
        gender = 'male'
    else:
        gender = 'female'

    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', f'book_{age}_{gender}_data.xlsx')
    df = pd.read_excel(excel_file_path)
    SAMPLE_SIZE = 10
    sample_df = df['isbn13'].sample(n=SAMPLE_SIZE)
    sample_list = sample_df.values.tolist()

    a = {'recom_list': sample_list}
    
    return Response(data=a, status=200, content_type='application/json')

    

@api_view(['POST'])
def sentence(request):

    sentence = request.data.get('sentence')
    sentence = str(sentence)

    
    # 엑셀 파일 경로 지정
    excel_file_path = os.path.join(os.getcwd(),'basic_recom', 'excel', 'score_list.csv')
    # 엑셀 파일을 데이터프레임으로 변환
    df = pd.read_csv(excel_file_path, usecols=['WRD_NM', 'AFRM_SCORE_VALUE', 'NEGA_SCORE_VALUE'])


    def paragraph_to_score(para):
        pos_list = []
        neg_list = []
        
        para_list = para.split()
        new_para_list = []
        
        for para_factor in para_list:
            if len(para_factor) > 1 and para_factor[-1] in "은는이가의":
                para_factor = para_factor[:len(para_factor)-1]
                new_para_list.append(para_factor)

        

        for word in new_para_list:
            if word in df['WRD_NM'].values:
                row = df.loc[df['WRD_NM'] == word]
                pos_list.append(row['AFRM_SCORE_VALUE'].values[0])
                neg_list.append(row['NEGA_SCORE_VALUE'].values[0])
            else:
                pass
        # for word, pos in okt.pos(para, stem=True):
        #     if word in df['WRD_NM'].values:
        #         row = df.loc[df['WRD_NM'] == word]
        #         pos_list.append(row['AFRM_SCORE_VALUE'].values[0])
        #         neg_list.append(row['NEGA_SCORE_VALUE'].values[0])
        #     else:
        #         pass
        
        pos = sum(pos_list)
        neg = sum(neg_list)

        if pos != 0:
            pos = pos/len(pos_list)

        if neg != 0:
            neg = neg/len(pos_list)
        
        
        
        if pos >= neg:
            state = 1
            return {'state' : state, 'score': {'pos':pos, 'neg':neg}}
        else:
            state = 0
            return {'state' : state, 'score': {'pos':pos, 'neg':neg}}
        
    a = paragraph_to_score(sentence)
    return Response(data=a, status=200, content_type='application/json')




@api_view(['POST'])
def sentence_recom(request):

    user_id = request.data.get('user_id')
    user = Userr.objects.get(user_id=user_id)

    user_score = user.prefer_score
    user_type =  user.prefer_type

    paragraphs = Paragraph.objects.exclude(user=user)

    

    if not paragraphs:
        b = {'recom_list' : "유저가 모든 문장을 작성 했습니다",
             'result' : False}
        return Response(data=b, status=200, content_type='application/json')

    paragraphs = paragraphs.filter(paragraph_score_type=user_type)

    
    

    if not paragraphs:
        b = {'recom_list' : "유저의 타입과 일치하는 문장이 없어서 추천을 할 수 없습니다.",
             'result' : False}
        return Response(data=b, status=200, content_type='application/json')

    paragraphs = paragraphs.annotate(
    diff=Abs(F('paragraph_score') - Value(user_score, output_field=FloatField()))
)
    paragraphs = paragraphs.order_by('diff')

    

    result = paragraphs.values_list('paragraph_id', flat=True)

    a = {'recom_list': list(result),
         'result' : True}
    
    return Response(data=a, status=200, content_type='application/json')


