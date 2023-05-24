# 'ttbjoyksj940955001', 'ttbgoflwla921118001ttbjoyksj940955001', 'ttbgoflwla921118001', 'ttbcjg050341002001'

# raw_name = '국내도서>사회과학>한국정치사정/정치사>한국정치사정/정치사-일반'
raw_name = '국내도서>소설/시/희곡>영미소설'
genre_name = raw_name
if '>' in raw_name :
    idx = raw_name.index('>')
    print('idx', idx)
    idx2 = raw_name.index('>', idx+1)
    print('idx2', idx2)
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
print(genre_name)

# name = '세이노 (지은이)'
# if '(지은이)' in name :
#     idx = name.index('(')
#     name = name[:idx-1]
# print('수정이름',name)
