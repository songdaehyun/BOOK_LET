import requests

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from .models import *
from django.conf import settings

import json
import pandas as pd
import os
import shutil
import csv

from .scores import isbn_lst
# Create your views here.


# 알라딘 키
ALA_API_KEY = ['ttbjoyksj940955001', 'ttbgoflwla921118001', 'ttbcjg050341002001']
KEY_NUM = 0
BASE_URL = 'http://www.aladin.co.kr/ttb/api/'
MAIN = 'ItemList.aspx'
DETAIL = 'ItemLookUp.aspx'

@api_view(['GET'])
def test(request):
    # book = Book.objects.create(
    #             book_isbn = "124124",
    #             book_title = "책 제목",
    #             book_publisher = "출판사",
    #             book_price = 100,
    #             book_description = "요약")
    # author = Author.objects.create(
    #     author_name = "작가이름"
    # )
    # book.author.add(author)
    # author.books.add(book)
    # print("완료")

    book = Book.objects.get()

    return JsonResponse()

def book_detail(book_isbn):
    # print('책 세부내용 가지러 왔습니다!', book_isbn)
    response = requests.get(
     BASE_URL + DETAIL,
     params={
        'ttbkey' : ALA_API_KEY[KEY_NUM],
        'itemIdType' : 'ISBN',
        'ItemId' : book_isbn,
        'output' : 'js',
        'Version' : 20131101,
        'OptResult' : 'ratingInfo,reviewList'
     }
    ).json()

    try:
        book = response.get('item')[0]
    except:
        return None
    
    # reivewList = book.get('reviewList')
    try:
        ratingScore = book.get('subInfo').get('ratingInfo').get('ratingScore')
    except :
        ratingScore = 0 # 평가 기본값 0

    print('책 세부내용 조회 책 이름 : ',book.get('title'))

    book_info = {
         'grade' : ratingScore,
         'genre_id' : book.get('categoryId'),
         'genre_name' : book.get('categoryName')
    }
     
    return book_info


def author_info(name, bookEntity):
    # print('원래 이름 : ',name)
    if '(지은이)' in name :
        idx = name.index('(')
        name = name[:idx]
    

    # 여러명일 경우 제일 앞만 적용
    if ',' in name:
        idx = name.index(',')
        name = name[:idx]

    # print('수정 이름 : ',name)
    # Author 객체를 가져오거나 생성 //참고 created = true : 생성한거, false면 기존꺼
    author, created = Author.objects.get_or_create(author_name=name)
    

    bookEntity.author = author
    bookEntity.save()
    # 작가 저장
    return


def genre_save(book_info, bookEntity):
    raw_name = book_info.get('genre_name')
    genre_name = raw_name
    # print('변경 전 장르이름', genre_name)
    if '>' in raw_name :
        idx = raw_name.index('>')
        # print('idx', idx)
        idx2 = raw_name.index('>', idx+1)
        # print('idx2', idx2)
        if idx == idx2:
            idx2 = -1
        genre_name = raw_name[idx+1:idx2]
        # 소설 시 희곡 분리
        if genre_name == '소설/시/희곡':
            if raw_name.count('>') == 2:
                if raw_name[-2:len(raw_name)] == '소설':
                    genre_name = '소설'
                elif raw_name[-2:len(raw_name)] == '희곡':
                    genre_name = '희곡'
                elif raw_name[-1] == '시':
                    genre_name = '시'
                else:
                    genre_name = raw_name[idx2 + 1:]
            else:
                idx3 = raw_name.index('>', idx2+1)
                if raw_name[idx3-2 : idx3] == '소설':
                    genre_name = '소설'
                elif raw_name[idx3-2 : idx3] == '희곡':
                    genre_name = '희곡'
                elif raw_name[idx3-1] == '시':
                    genre_name = '시'
                else:
                    genre_name = raw_name[idx2 + 1 : idx3]
    if genre_name == None:
        genre_name = "기타"

    # Genre 객체를 가져오거나 생성
    genre, created = Genre.objects.get_or_create(genre_name=genre_name)
    
    # 장르와 책 연결
    book_genre = BookGenre(book_isbn=bookEntity, genre=genre)
    book_genre.save()
    bookEntity.save()
    return


@api_view(['GET'])
def insert_db(request):
    print('DB 저장하러 왔습니다.')
    context = {
        'result' : '완료' 
    }
    start = 0
    # start = 15
    end = 100
    for i in range(start, end):
        for j in range(4): # 분기마다 처리
            year = 2022-i
            month = 12-3*j
            print('#'*50)
            print(f'{year}-{month} 베스트셀러 들어갑니다!')
            print('#'*50)
            
            response = requests.get(
                BASE_URL + MAIN,
                params={
                    'ttbkey' : ALA_API_KEY[KEY_NUM],
                    'QueryType' : 'Bestseller',
                    'MaxResults' : 100,
                    'start' : 1,
                    'SearchTarget' : 'Book',
                    'output' : 'js',
                    'Version' : 20131101,
                    'cover' : 'Big',
                    'Year' : year,
                    'Month' : month,
                    'Week' : 1
                }
            ).json()

            book_list = response.get('item')
            for book in book_list:
                isbn = 'isbn13'
                if book.get(isbn) == '':
                    isbn = 'isbn'
                    print('isbn13없으므로 패스합니다 : ', book.get('title'))
                    continue
                elif len(book.get(isbn)) < 13 or book.get(isbn)[0]=='G':
                    print('isbn이상으로인해 패스합니다.', book.get(isbn), book.get('title'))
                    continue
                print(f'작업 중 인 도서 : {book.get("isbn13")}, {book.get("title")}')

                # 책 데이터 저장
                if not Book.objects.filter(pk=book.get(isbn)).exists():
                    # 책 디테일 불러오기
                    book_info = book_detail(book.get(isbn))
                    # 책 세부 요소 확인
                    try : 
                        grade = book_info.get('grade')/2
                    except :
                        grade = 0 # 기본값
                    # 책 저장
                    bookEntity = Book.objects.create(
                        book_isbn = book.get(isbn),
                        book_title = book.get('title'),
                        book_publisher = book.get('publisher'),
                        book_price = book.get('priceStandard'),
                        book_description = book.get('description'),
                        book_grade = grade,  # 5점 만점으로 변경
                        book_image = book.get('cover'),
                        # book_author = author_info(book.get('author')) # 테이블로 변경
                    )
                    # 저자 및 장르 저장
                    # print('저자 세이브')
                    author_info(book.get('author'), bookEntity)
                    # print('장르 세이브')
                    genre_save(book_info, bookEntity)


        
    return JsonResponse(context)


@api_view(['GET'])
def insert_new(request):
    print('신규 도서 DB 저장하러 왔습니다.')
    context = {
        'result' : '신규 도서 완료' 
    }
    start = 0
    end = 100
    for i in range(start, end):
        print('#'*50)
        print(f'신규서적 들어갑니다! : {i}번째')
        print('#'*50)
        try:
            response = requests.get(
                BASE_URL + MAIN,
                params={
                    'ttbkey' : ALA_API_KEY[KEY_NUM],
                    'QueryType' : 'ItemNewSpecial',
                    'MaxResults' : 50,
                    'start' : i,
                    'SearchTarget' : 'Book',
                    'output' : 'js',
                    'Version' : 20131101,
                    'cover' : 'Big'
                }
            ).json()
        except:
            print(f"요청 실패로 인해 넘어갑니다 : {i}번째")
            continue

        book_list = response.get('item')
        for book in book_list:
            isbn = 'isbn13'
            if book.get(isbn) == '':
                isbn = 'isbn'
                print('isbn13없으므로 패스합니다 : ', book.get('title'))
                continue
            elif len(book.get(isbn)) < 13 or book.get(isbn)[0]=='G':
                print('isbn이상으로인해 패스합니다.', book.get(isbn), book.get('title'))
                continue
            print(f'작업 중 인 도서 : {book.get("isbn13")}, {book.get("title")}')

            # 책 데이터 저장
            if not Book.objects.filter(pk=book.get(isbn)).exists():
                # 책 디테일 불러오기
                book_info = book_detail(book.get(isbn))
                if book_info == None:
                    continue
                # 책 세부 요소 확인
                try : 
                    grade = book_info.get('grade')/2
                except :
                    grade = 0 # 기본값
                # 책 저장
                bookEntity = Book.objects.create(
                    book_isbn = book.get(isbn),
                    book_title = book.get('title'),
                    book_publisher = book.get('publisher'),
                    book_price = book.get('priceStandard'),
                    book_description = book.get('description'),
                    book_grade = grade,  # 5점 만점으로 변경
                    book_image = book.get('cover'),
                    # book_author = author_info(book.get('author')) # 테이블로 변경
                )
                # 저자 및 장르 저장
                # print('저자 세이브')
                author_info(book.get('author'), bookEntity)
                # print('장르 세이브')
                genre_save(book_info, bookEntity)


        
    return JsonResponse(context)


@api_view(['GET'])
def save_isbn(request):
    import_data()
    print('DB lst 저장하러 왔습니다.')
    context = {
        'result' : '완료' 
    }
    isbns = isbn_lst.isbn_lst
    size = len(isbns)
    cnt = 0
    for target_isbn in isbns:
        cnt += 1
        target_isbn = str(target_isbn)
        if Book.objects.filter(book_isbn=target_isbn).exists():
            tmp_book = Book.objects.get(book_isbn=target_isbn)
            print("이미 책이 존재하므로 넘김니다.", tmp_book.book_title, tmp_book.book_isbn)
            continue
        response = requests.get(
        BASE_URL + DETAIL,
        params={
            'ttbkey' : ALA_API_KEY[KEY_NUM],
            'itemIdType' : 'ISBN',
            'ItemId' : target_isbn,
            'output' : 'js',
            'Version' : 20131101,
            'OptResult' : 'ratingInfo,reviewList'
        }
        ).json()
        book = response.get('item')[0]
        # reivewList = book.get('reviewList')
        try:
            ratingScore = book.get('subInfo').get('ratingInfo').get('ratingScore')
        except :
            ratingScore = 0 # 평가 기본값 0

        print('책 세부내용 조회 책 이름 : ',book.get('title'))

        book_info = {
            'grade' : ratingScore,
            'genre_id' : book.get('categoryId'),
            'genre_name' : book.get('categoryName')
        }
        
        isbn = 'isbn13'
        if book.get(isbn) == '':
            isbn = 'isbn'
            print('isbn13없으므로 패스합니다 : ', book.get('title'))
            continue
        elif len(book.get(isbn)) < 13 or book.get(isbn)[0]=='G':
            print('isbn이상으로인해 패스합니다.', book.get(isbn), book.get('title'))
            continue
        print(f'작업 중 인 도서 : {book.get("isbn13")}, {book.get("title")}, 진행상황 : {cnt}/{size}')

        try : 
            grade = book_info.get('grade')/2
        except :
            grade = 0 # 기본값
        # 책 저장
        bookEntity = Book.objects.create(
            book_isbn = book.get(isbn),
            book_title = book.get('title'),
            book_publisher = book.get('publisher'),
            book_price = book.get('priceStandard'),
            book_description = book.get('description'),
            book_grade = grade,  # 5점 만점으로 변경
            book_image = book.get('cover'),
            # book_author = author_info(book.get('author')) # 테이블로 변경
        )
        # 저자 및 장르 저장
        # print('저자 세이브')
        author_info(book.get('author'), bookEntity)
        print('장르 세이브')
        genre_save(book_info, bookEntity)

    return JsonResponse(context)


# 감성점수 분석을 위한 세팅
base_titles = []
base_contents = []

def import_data():
    try:
        csv_file_path = os.path.join(settings.BASE_DIR, 'dbmain\scores', 'NL_BO_SENSE_2021.csv')
        with open(csv_file_path, 'rt', encoding="UTF8") as f:
            reader = csv.reader(f)

            stores = dict()  # {키워드 : [긍정, 부정], ... }
            print(reader)
            for d in reader:
                # 긍정 부정 점수
                rates = []
                rates.append(d[2])
                rates.append(d[3])
                # 저장소에 저장 딕셔너리로 추가
                stores[d[1]] = rates

            f.closed
            
            return stores

    except FileNotFoundError as e:
        print(f"`{csv_file_path}` 가 존재하지 않습니다.")
        exit(1)


def check(content, scores):
    content_lst = content.split()
    positive_score = []
    negative_score = []
    for content_factor in content_lst:
        if len(content_factor) > 1 and content_factor[-1] in "은는이가의":
            # print("변경")
            content_factor = content_factor[:len(content_factor)-1]
        try:
            # print("점수측정")
            # print("스코어!!!!!!!!!! : ", scores[content_factor])
            positive_score.append(float(scores[content_factor][0]))
            negative_score.append(float(scores[content_factor][1]))
        except:
            # print("오류")
            continue
            
    total_positive_score = sum(positive_score)
    total_negative_score = sum(negative_score)
    
    score = max(total_positive_score, total_negative_score)
    if total_positive_score >= total_negative_score:
        state = 1
    else:
        state = 0

    return score, state