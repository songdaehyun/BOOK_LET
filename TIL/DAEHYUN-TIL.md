# matrix factorization 알고리즘

```python
import pandas as pd
from surprise import Dataset, Reader, KNNWithMeans, KNNBasic, SVD
import matplotlib.pyplot as plt
from PIL import Image
import requests


#사용할 데이터
pd.set_option('max_colwidth', 1000)
df = pd.read_excel('aladin/aladin_sample_data2.xlsx')

#평점이 0인 부분 제거 (분석과정에서 오류남)
df = df[df['book_reviewRank'] != 0]


# Surprise 라이브러리에서 사용할 데이터셋 형태로 변환, 리뷰어, 책제목, 평점 순으로 들어가야함!!!!!!!!!
reader = Reader(rating_scale=(1, 10))
data = Dataset.load_from_df(df[['book_reviewWriter', 'book_title', 'book_reviewRank']], reader)


trainingSet = data.build_full_trainset()

##random_state의 경우 시드값을 고정해서 동일한 데이터는 동일한 결과를 내놓음
algo = SVD(n_factors=50, n_epochs=30, lr_all=0.01, reg_all=0.06, random_state=42)
algo.fit(trainingSet)


# 특정 유저
user_id = '중고책은 곽한구'


# #특정 유저가 이미 읽은 책 목록
filterd_df = df.loc[df['book_reviewWriter'] == user_id]
user_read = filterd_df['book_title'].unique()

print(user_read)

# #전체 책 목록

all_book = df['book_title'].unique()


# #유저가 읽지 않은 책 목록
no_user_read = df.loc[~df['book_title'].isin(filterd_df['book_title'])]['book_title'].unique()

# #아이템 간의 유사도 행렬
# similarity_matrix = algo.compute_similarities()

#추천 목록
predictions = []
for book_id in no_user_read:
    predictions.append((book_id, algo.predict(user_id, book_id).est))
predictions.sort(key=lambda x: x[1], reverse=True)
for book_id, rating in predictions[:10]:
    print(f'Book ID: {book_id}, Estimated Rating: {rating:.2f}')



#이미지와 예상펑점

fig, axs = plt.subplots(1, 5,figsize=(18,5))
fig.suptitle("You may also like these books", size = 22)
for i in range(len(predictions[:5])):
    url = df.loc[df['book_title'] == predictions[i][0],'book_cover'].iloc[0]
    im = Image.open(requests.get(url, stream=True).raw)
    axs[i].imshow(im)
    axs[i].axis("off")
    axs[i].set_title(f'Rating: {predictions[i][1]: .2f}',
                                 fontsize=18, y=-0.18)

fig.show()
```

    ['재무제표 모르면 주식투자 절대로 하지마라 - 스타강사 사경인 회계사의, 최신 개정판']
    Book ID: 차트분석 무작정 따라하기 - 100만 독자가 인정한 주식 1등 저자의 책, 2022년 개정판, Estimated Rating: 8.40
    Book ID: 일본이 흔들린다 - 경제, 정책, 산업, 인구로 살펴본 일본의 현재와 미래, Estimated Rating: 8.38
    Book ID: 돈의 규칙 - 돈은 당신의 명령을 기다린다, Estimated Rating: 8.35
    Book ID: 2023 해커스 세법 FINAL OX문제+개념 완성 문제 : 부가가치세법/소득세법/상속세 및 증여세법/법인세법/국세기본법 - 공인회계사(CPA)/세무사(CTA) 1차 시험 대비｜최신 개정세법 반영｜본 교재 인강 할인쿠폰 수록, Estimated Rating: 8.30
    Book ID: 사이토 히토리의 1퍼센트 부자의법칙 - 반드시 성공하는 일천 번의 법칙, Estimated Rating: 8.30
    Book ID: 최진기의 경제상식 오늘부터 1일, Estimated Rating: 8.29
    Book ID: 챗GPT와 글쓰기 - ChatGPT와 함께하는 AI 글쓰기 실전, Estimated Rating: 8.27
    Book ID: 자이언트 임팩트 - 인플레이션, 금리, 전쟁, 에너지 4개의 축이 뒤흔드는 지금부터의 세계, Estimated Rating: 8.27
    Book ID: 돈의 심리학 - 당신은 왜 부자가 되지 못했는가, Estimated Rating: 8.23
    Book ID: 5천만 원으로 시작하는 미라클 기적의 재개발 재건축 - 세금·금리·청약에서 자유로운 재개발 투자의 마법, Estimated Rating: 8.23


    C:\Users\SSAFY\AppData\Local\Temp\ipykernel_5116\2614506221.py:71: UserWarning: Matplotlib is currently using module://matplotlib_inline.backend_inline, which is a non-GUI backend, so cannot show the figure.
      fig.show()

![png](output_0_2.png)

```python

```

2023/03/14
깃이 너무 어렵다요
