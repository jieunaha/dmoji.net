 - styleguide.html 은 boostsrap4 를 기반으로 작성 되었습니다.
 - custom style 코드는 styleguide.html 의 head 태그 내부에 style 태그로 작성되어 있습니다.
 - 기존의 스타일을 전부 무시하고 새로 작업 하셔도 좋습니다.
 - styleguide.html의 main 내부에 가능한 모든 경우의 HTML 요소들을 flatten 하여 집어넣었습니다.
 - 기본적인 마크업 hierachy는 아래와 같습니다
 
main
-div.req
--section
-div.res.res-1
--section
-div.res.res-2
--section

즉, main 아래 세개의 상위 div 이 존재하며 각 div 들의 내부는 section으로 구획됩니다.

 - 실제로 REST API를 호출하는 demo는 여기를 참고해 주세요 -> https://dev.dmoji.net
 -- API 호출시 실패 케이스가 존재할 수 있습니다.

 - dummy data를 사용하는 demo는 여기를 참고해 주세요 -> https://dev.dmoji.net
 -- 항상 성공 케이스로만 움직입니다.