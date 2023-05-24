# yes24 영화 리뷰 크롤링
```python
import time
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

# keyword = input('회사명 : ')

chrome_options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

driver.get(f'http://www.yes24.com/Product/Goods/115142458')


print('#'*100)

book_name = driver.find_element(By.CLASS_NAME, 'gd_name').text
print('도서명 : ', book_name)

book_rate = driver.find_element(By.CLASS_NAME, 'yes_b').text
print('전체 평점 : ', book_rate)

book_isbm = driver.find_element(By.XPATH, '//*[@id="infoset_specific"]/div[2]/div/table/tbody/tr[3]/td').text
print('ISBM13 : ', book_isbm)

book_rate_ages = driver.find_elements(By.XPATH, '//*[@id="ageChart"]/ul')
for book_rate_age in book_rate_ages:
    print(book_rate_age.text.split('\n'))

print('#'*100)

reviews = driver.find_elements(By.CLASS_NAME, 'reviewInfoGrp.lnkExtend')
for review in reviews:
    # 아이디
    try:
        if "YES마니아" in review.text.split('|')[1].strip():
            print(review.text.split('|')[1].strip().split(" ")[-1])
        else:
            print(review.text.split('|')[1].strip())
    except:
        pass

    # 내용 별점
    print(review.text.split('|')[0].strip().split("평점")[1][0])
    
    # 디자인 별점
    print(review.text.split('|')[0].strip().split("평점")[-1][0])

    # 타이틀
    print(review.text.split('\n')[0])

    # 내용
    print(review.text.split('\n'))

    # # 시간
    # print(review.text.split('\n')[1])

time.sleep(2)
```

# 감성점수
## 감성점수 제목별 분류
- [결과](https://www.notion.so/f94033d6d62f4be68ce50c049cb1bef9)
```python
import json
import pandas as pd
import os
import shutil
import csv

DATA_DIR = "./data"
DATA_FILE = os.path.join(DATA_DIR, "NL_BO_SENSE_202012.csv")
DUMP_FILE = os.path.join(DATA_DIR, "dump.pkl")

base_titles = []


def import_data(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """

    try:
        with open(data_path, 'rt', encoding="UTF8") as f:
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
        print(f"`{data_path}` 가 존재하지 않습니다.")
        exit(1)


def check(title, scores):
    title_lst = title.split()
    positive_score = []
    negative_score = []
    for title_factor in title_lst:
        if len(title_factor) > 1 and title_factor[-1] in "은는이가의":
            # print("변경")
            title_factor = title_factor[:len(title_factor)-1]

        try:
            # print("점수측정")
            # print("스코어!!!!!!!!!! : ", scores[title_factor])
            positive_score.append(float(scores[title_factor][0]))
            negative_score.append(float(scores[title_factor][1]))
        except:
            # print("오류")
            continue
            
    total_positive_score = sum(positive_score)
    total_negative_score = sum(negative_score)
    
    score = max(total_positive_score, total_negative_score)

    return title, score


def get_title():
    # for _ in range(1):
    #     i = '02'
    for i in range(3, 13):
        if i == 9:
            continue
        if i < 10:
            i = '0' + str(i)
        else:
            i = str(i)
        
        FILE = os.path.join(DATA_DIR, f'NL_BO_BEST_BOOK_HISTORY_ARCHIVE_2021{i}.csv')
        try:
            with open(FILE, 'rt', encoding="UTF8") as f:
                reader = csv.reader(f)
                for r in reader:
                    base_titles.append(r[5])
                # title만 뽑자
                # f.closed


        except FileNotFoundError as e:
            print(f"`{FILE}` 가 존재하지 않습니다.")
            exit(1)

def main():

    data = import_data()

    get_title()

    results = dict()
    for title in base_titles:
        # print("작업중인 도서 : ", title)
        book, score = check(title, data)
        results[book] = score
    
    check()


    # new_dict = dict(results.items(), key=lambda x:x[1])
    # # for i in new_dict.items():
    # #     print(i)

    # f = open('write.csv','w', newline='', encoding='UTF8')
    # wr = csv.writer(f)
    # i = 0
    # for final_title, final_rate in new_dict.items():
    #     i += 1
    #     wr.writerow([i,final_title, final_rate])
    
    f.close()


if __name__ == "__main__":
    main()
```

## 감성점수(요약)
- [결과](https://www.notion.so/f94033d6d62f4be68ce50c049cb1bef9)
```python
import json
import pandas as pd
import os
import shutil
import csv

DATA_DIR = "./data"
DATA_FILE = os.path.join(DATA_DIR, "NL_BO_SENSE_202012.csv")
DUMP_FILE = os.path.join(DATA_DIR, "dump.pkl")

base_titles = []
base_contents = []


def import_data(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """

    try:
        with open(data_path, 'rt', encoding="UTF8") as f:
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
        print(f"`{data_path}` 가 존재하지 않습니다.")
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


def get_title():
    # for _ in range(1):
    #     i = '02'
    for i in range(3, 13):
        if i == 9:
            continue
        if i < 10:
            i = '0' + str(i)
        else:
            i = str(i)
        
        FILE = os.path.join(DATA_DIR, f'NL_BO_BEST_BOOK_HISTORY_ARCHIVE_2021{i}.csv')
        try:
            with open(FILE, 'rt', encoding="UTF8") as f:
                reader = csv.reader(f)
                for r in reader:
                    base_titles.append(r[5])
                # title만 뽑자
                # f.closed


        except FileNotFoundError as e:
            print(f"`{FILE}` 가 존재하지 않습니다.")
            exit(1)


def get_detail():
    # for _ in range(1):
    #     i = '02'
    for i in range(3, 13):
        if i == 9:
            continue
        if i < 10:
            i = '0' + str(i)
        else:
            i = str(i)
        
        FILE = os.path.join(DATA_DIR, f'NL_BO_BEST_BOOK_HISTORY_ARCHIVE_2021{i}.csv')
        try:
            with open(FILE, 'rt', encoding="UTF8") as f:
                reader = csv.reader(f)
                for r in reader:
                    base_contents.append((r[5], r[7]))


        except FileNotFoundError as e:
            print(f"`{FILE}` 가 존재하지 않습니다.")
            exit(1)


def main():
    data = import_data()
    get_detail()

    results = list()
    for content in base_contents:
        score, state = check(content[1], data)
        if score == 0:
            continue
        results.append((content[0], content[1], score, state))

    results.sort(key=lambda x:(x[3], x[2]))
    # print(results)

    f = open('write.csv','w', newline='', encoding='UTF8')
    wr = csv.writer(f)
    i = 0
    for final_title, final_content, final_rate, final_state in results:
        i += 1
        if final_state == 1:
            final_state = "P"
        else:
            final_state = "N"
        wr.writerow([i, final_state, final_rate, final_title, final_content])
    
    f.close()


# def main():

#     data = import_data()

#     get_title()

#     results = dict()
#     for title in base_titles:
#         # print("작업중인 도서 : ", title)
#         book, score = check(title, data)
#         results[book] = score
    
#     # check()


#     new_dict = dict(results.items(), key=lambda x:x[1])
#     # for i in new_dict.items():
#     #     print(i)

#     f = open('write.csv','w', newline='', encoding='UTF8')
#     wr = csv.writer(f)
#     i = 0
#     for final_title, final_rate in new_dict.items():
#         i += 1
#         wr.writerow([i,final_title, final_rate])
    
#     f.close()


if __name__ == "__main__":
    main()
```

# Deep Learning
# 인공지능 Dataset 공유 : AI Hub
# Teachable Machine
- [링크](https://teachablemachine.withgoogle.com)

# TensorFlow.js
- [링크](https://www.tensorflow.org/js)


# OCR 테스트
- 팀 미팅 때, 언급되었던 카메라로 책을 찍어 사진에서 문자를 추출하는 기술인 OCR을 사용해서 문자를 직접 추출해보았습니다.
- pytesseract를 사용하여 진행하였습니다.
- 소스코드
```python
import pytesseract
from PIL import Image


pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
text = pytesseract.image_to_string(Image.open("test5.jpg"), lang='kor')
print(text)
print(text.replace(" ", ""))
```
![test](https://user-images.githubusercontent.com/109258380/223662975-4c1a31e8-de41-4398-8676-cfe97e388eba.jpg)
- 결과(이미지 전체)
```
2근 옵 누 읍 꺼 아 /(2 률 10 6 다

/.89

|? 옥 8 [@ 논 픈 2 ㅁ [5 릎 은 ?운 오 읍 움 [0109 룸 1 올 6 준 (? 다 시 1& 6 공 다비
m밖*:웅[m{삐떠 [ 융 | 릉 109 [ ㅁ 픔 면 눈 8[ 이 8 { 윤 훈스 응 6 루 느 ㅇ 는 혼    
70 ㅡ =

오 른 닙 0Ｌ 플 ]()9 극 { 오 문 를 72998 루 [ 애 /0[ 1[3[316 12040 1&6[& 소 1616
1 은 [^ 보는 = ==

ㅇ 소스 조 : 06 서 훌 1쩨
{1216@ 동 픔 16 는 브 3156 136040 18 보 순 궁
' 혈 【 ” 3 《 . 느 게 2. . 휘 즈 |쿰¶0
10)9 2=6 ㅜ ㅋ 88880 888009 10883 * 129488 6 으 노 103368 06 누 6
그 09896 크 보는 6 누 준 등 16999 니 16600 해

[218 3 이 오 & 존 직 799996 눔 푼 눈 |

등 [0)8 20340 093 , 326129 [ 나 온 노 좀 릉 그 ()8( ㅇ 2610 000 구 구 ㅇ 72639

'8626 주 긍 런 6 미 이 니 시

ㅁ 극 6 릉 105 [6{ 오 륜 올 10161 문놀 104
으 존 1 늦 너 208 훈유 푸 논 1590 8 홀 .
근는 극 [ 논 론 읍 . 드 1098 [[ 온 논 곰 릉 ㅁ 0801

10 [ ㄴ { 온 곰근 극 [0 읍 눌 6 극 |
쓰 Ｌ ㄴ 19 프 른 릉 는 푼 너 ! 밸 려

'108 눔 도 롭 [ 가 017400
108 눔 들 롭 [ 그 0(03)74002/
108 눔 들 릅 [23500(3174000
'105 눔 들 릅 근 소 넌 단 뮤 덤 // /

&=0 ㅁ ㅠ 226 그 2990420[{ 00 그 3 *
6 ㅇ =0 ㅜ 949 다 삐 그 급 이 따 리이 010 그 푸 *
= 2244 29461 440 그 3 *
6=0 ㅁ ㅠ 2244 그 20012][ 100 그 푸 *
' 띠 비 톤 투 테 종 1630//.16650005 혀
[

' ㅁ 혼 논 릉 {4」 긍 105

.칸힙찌꽁삐 부아
99912 07565006 아 여 ㅋ 13[316 극 놈 뜨 폰 돈 // . / () 36 ㅜ 93 ㅜ ㅁ 9283

소2 고 웅 아
이 라 따 느 6 091266 ) 426002362419

= 92019

]008[[ 5

1281 쓰 므 & 옴 릅 . 으 그 아비 [|>. 표

2근옵누읍꺼아/(2률106다

/.89

|?옥8[@논픈2ㅁ[5릎은?운오읍움[0109룸1올6준(?다시1&6공다비
m밖*:웅[m{삐떠[융|릉109[ㅁ픔면눈8[이8{윤훈스응6루느ㅇ는혼
70ㅡ=

오른닙0Ｌ플]()9극{오문를72998루[애/0[1[3[316120401&6[&소1616
1은[^보는===

ㅇ소스조:06서훌1쩨
{1216@동픔16는브315613604018보순궁
'혈【”3《.느게2..휘즈|쿰¶0
10)92=6ㅜㅋ8888088800910883*1294886으노10336806누6
그09896크보는6누준등16999니16600해

[2183이오&존직799996눔푼눈|

등[0)820340093,326129[나온노좀릉그()8(ㅇ2610000구구ㅇ72639

'8626주긍런6미이니시

ㅁ극6릉105[6{오륜올10161문놀104
으존1늦너208훈유푸논15908홀.
근는극[논론읍.드1098[[온논곰릉ㅁ0801

10[ㄴ{온곰근극[0읍눌6극|
쓰Ｌㄴ19프른릉는푼너!밸려

'108눔도롭[가017400
108눔들롭[그0(03)74002/
108눔들릅[23500(3174000
'105눔들릅근소넌단뮤덤///

&=0ㅁㅠ226그2990420[{00그3*
6ㅇ=0ㅜ949다삐그급이따리이010그푸*
=224429461440그3*
6=0ㅁㅠ2244그20012][100그푸*
'띠비톤투테종1630//.16650005혀
[

'ㅁ혼논릉{4」긍105

.칸힙찌꽁삐부아
9991207565006아여ㅋ13[316극놈뜨폰돈//./()36ㅜ93ㅜㅁ9283

소2고웅아
이라따느6091266)426002362419

=92019

]008[[5

1281쓰므&옴릅.으그아비[|>.표
```

![test5](https://user-images.githubusercontent.com/109258380/223662998-4cd6f58a-5cd4-4c0c-a65c-949317f551c4.jpg)
- 결과(이미지 일부)
```
만 약 조 회 한 65365 엔 티 티 가 10 개 이면 06066= 를 조 회 하 는 501 도 10 번 실 행        
한 다 . 이 처 럼 처 음 조 회 한 데 이 터 수 만 큼 다 시 80[ 을 사 용 해 서 조 회 하 는 것 을        
101 문 제라 한 다 . \4+1 이 발 생 하 면 501 이 상 당 히 많 이 호 출 되 므 로 조 회 성 능 에

만약조회한65365엔티티가10개이면06066=를조회하는501도10번실행
한다.이처럼처음조회한데이터수만큼다시80[을사용해서조회하는것을
101문제라한다.\4+1이발생하면501이상당히많이호출되므로조회성능에
```

- 이미지를 전체로 선택하여 진행 시, 제대로 인식이 되지 않은 문제가 있었습니다.
  - 이를 해결하기 위해서 이미지를 잘라 보았고(실제로 사용할 영역도 문장 추출이기 때문에)
- 전반적인 인식은 잘 되었으나, 한국어로 세팅을 해놓으니 영어를 인식하지 못하는 문제가 있었습니다.
  - 좀 더 찾아볼 생각입니다. 만약에 잘 안된다면 유료 api인 구글 api 사용도 고려중입니다.

# 노션을 통해서 API Docs를 구체화 하였습니다
- https://www.notion.so/API-7770b14069104c49b07a072babe34a96

# Spring Security
### Spring Security

- [스프링 시큐리티 샘플 코드(springboot 2.57 & java 11)](https://github.com/codingspecialist/-Springboot-Security-OAuth2.0-V3)
- [스프링 시큐리티 기본](https://catsbi.oopy.io/c0a4f395-24b2-44e5-8eeb-275d19e2a536)
- [스프링 시큐리티 변경 점(springboot 2.x → 3.x)](https://nahwasa.com/entry/스프링-부트-20에서-30-스프링-시큐리티-마이그레이션-변경점)
- [스프링 시큐리티 springboot 3.0 사용법](https://www.notion.so/399535bca5fc47a19080e295d3fa32a3)
- [스프링 시큐리티 공식문서](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html)

- 오류 해결
https://stackoverflow.com/questions/57836100/this-may-be-the-result-of-an-unspecified-view-due-to-default-view-name-generati
https://github.com/spring-projects/spring-security/issues/10822
- Spring security의 경우 Spring 3 버전대와 2번전대도 다르고
- 2.7버전과 그 아래 버전에서도 depreciate된 기능들이 있어서 학습하고 적용하는데 어려움을 겪고 있습니다.

- 실습 중이나 기간차이가 있어 어려움에 있습니다.
```java
package com.example.jwtsecure.config;

import com.example.jwtsecure.filter.MyFilter3;
import com.example.jwtsecure.jwt.JwtAuthenticationFilter;
import com.example.jwtsecure.jwt.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilter corsFilter;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                // 완전 앞에 넣어주고 싶으면 BasicAuthenticationFilter보다 빠른 녀석을 넣어주면 됨
//                .addFilterAfter(new MyFilter4(), BasicAuthenticationFilter.class) // 이런식으로 넣어줄 수 있음
                .addFilterBefore(new MyFilter3(), BasicAuthenticationFilter.class) // 이런식으로 넣어줄 수 있음
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsFilter)  // @CrossOrigin(인증X), 시큐리티 필터에 등록(인증의 경우도 O)
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))  // Authentication Manager
                .addFilter(new JwtAuthorizationFilter(authenticationManager()))  // Authentication Manager
//                .apply(new MyCustomDsl()) // 커스텀 필터 등록
//                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/user/**")
                .access("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
                .antMatchers("/api/v1/manager/**")
                .access("hasRole('MANAGER') or hasRole('ADMIN')")
                .antMatchers("/api/v1/admin/**")
                .access("hasRole('ADMIN')")
                .anyRequest().permitAll()
                .and().build();
    }
}

```

```java
package com.example.jwtsecure.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jwtsecure.config.auth.PrincipalDetails;
import com.example.jwtsecure.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;

// 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter가 있음
// /login 요청해서 username, password 전송하면 (post)
// UsernamePasswordAuthenticationFilter 동작함
// loginForm을 안사용하기 떄문에 활성화가 안되는데 그래서 security filter에 새로 등록해줘야됨
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    // /login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : 로그인 시도중");

        // 1. username, password 받아서
        try {
//            BufferedReader br = request.getReader(); // 이거는 formdata 사용시
//
//            String input = null;
//            while((input = br.readLine()) != null) {
//                System.out.println(input);
//            }
            ObjectMapper om = new ObjectMapper();
            User user = om.readValue(request.getInputStream(), User.class);
            System.out.println(user);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());

            // PrincipalDetailsService의 loadUserByUsername() 함수가 실행된 후 정상이라면 authentication이 리턴됨
            // DB에 있는 username과 password가 일치한다.
            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            // => 로그인 되었다는 뜻
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("로그인 완료 됨 : " + principalDetails.getUser().getUsername());
            // authentication 객체가 session영역에 저장 해야하고 그 방법이 return 해주면 됨.
            // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한 처리때문에 session을 넣어줌
            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행
    // JWT 토큰을 만들어서 request요청한 사용자에게 JWT토큰을 response해주면됨.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨 : 인증이 완료되었다는 뜻임");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject("cos토큰")// 토큰이름
                .withExpiresAt(new Date(System.currentTimeMillis()+(60000*10)))  // 60000 = 1분
                .withClaim("id", principalDetails.getUser().getId())  // jwt에 넣고싶은거 넣는거
                .withClaim("username", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512("cos"));

        response.addHeader("Authorization", "Bearer" + jwtToken);
        super.successfulAuthentication(request, response, chain, authResult);
    }
}
// 2. 정상인지 로그인 시도를 해보는 것 authenticationManager로 로그인을 시도하면
// PrincipalDetailsService가 호출 loadUserByUsername() 함수 실행됨.
// 3. PrincipalDetails를 세션에 담고 (권한 관리를 위해서, 권한 설정을 할 경우에만 사용하면 됨)
// 4. JWT토큰을 만들어서 응답해주면 됨

// 세션을 통한 로그인
// 유저네임, 패스워드 로그인 정상
// 서버쪽 세션ID생성
// 클라이언트 쿠키 세션ID를 응답
// 요청할 때마다 쿠키값 세션ID를 항상 들고 서버쪽으로 요청하기 때문에
// session.getAttribute("세션값 확인");
// 서버는 세션ID가 유효한지 판단해서 유효하면 인증이 필요한 페이지로 접근하게 하면됨

// jwt 토큰을 통한 로그인
// 유저네임, 패스워드 로그인 정상
// JWT토큰을 생성
// 클라이언트 쪽으로 JWT토큰을 응답
// 요청할 떄마다 JWT토큰을 응답
// 서버는 JWT토큰이 유효한지를 판단(필터를 만들어야 함)
```
```java
package com.example.jwtsecure.jwt;

// 시큐리티가 filter가지고 있는데 그 필터중에 BasicAuthenticationFilter 라는 것이 있음.
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어있음.
// 만약에 권한이 인증이 필요한 주소가 아니라면 이 필터를 안탐

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        super.doFilterInternal(request, response, chain);
        System.out.println("인증이나 권한이 필요한 주소 요청이 됨");

        String jwtHeader = request.getHeader("Authorization");
        System.out.println("jwtHeader : " + jwtHeader);

        // JWT 토큰을 검증을 해서 정상적인 사용자인지 확인
        if
    }
}

```

```java
package com.example.jwtsecure.config.auth;

import com.example.jwtsecure.model.User;
import com.example.jwtsecure.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// http://localhost:8080/login -> loginForm을 안쓰기 때문에 동작을 안함
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService의 loadUserByUsername()");
        User userEntity = userRepository.findByUsername(username);
        System.out.println("userEntity : " + userEntity);
        return new PrincipalDetails(userEntity);
    }
}

```