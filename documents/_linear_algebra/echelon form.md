---
title: "Echelon Form"
order: 3
date_created: "2021-09-20"
date_modified: "2021-10-29"
---

# elementary row operation

<ul>

<li><div markdown="block">

행렬에 대한 다음 세 가지 조작을 **elementary row operation**이라 한다.

- **replacement** : 특정 행을 자기 자신과 다른 행의 배수 배를 합한 것으로 교체한다.
- **interchange** : 두 행의 위치를 바꾼다.
- **scaling** : 특정 행에 0이 아닌 상수를 곱한다.

</div></li>

<li><div markdown="block">

elementary row operation은 "되돌릴" 수 있다(= 역연산이 가능하다). 즉 행렬 $A$에 일련의 elementary row operation을 행렬 $B$를 만들 수 있다면, 반대로 행렬 $B$에 (다른 순서의) 일련의 elementary row operation을 적용하여 행렬 $A$를 만들 수 있다.

</div></li>

<li><div markdown="block">

일련의 elementary row operation을 통해 행렬 $A$를 행렬 $B$로 바꿀 수 있다면, 행렬 $A$, $B$는 **행 동등하다(row equivalent)**고 한다. 이를 기호로 다음과 같이 나타낸다.

$$A \sim B$$

</div></li>

<li><div markdown="block">

만약 두 선형연립방정식의 augmented matrix가 행 동등(row equivalent)하다면, 두 선형연립방정식은 동등하다(equivalent).

</div></li>

</ul>

# echelon form

<ul>

<li><div markdown="block">

어떤 행렬이 다음 조건을 만족하면, 해당 행렬은 **echelon form** 또는 **row echelon form(REF)**에 있다고 한다.

- 모든 nonzero 행은 zero 행 위에 있다.
- 각 nonzero 행의 leading entry는 윗 (nonzero) 행의 leading entry보다 오른쪽에 있다.
- 각 열에서 leading entry 아래의 항목들은 모두 0이다.

여기서 **nonzero 행(nonzero row)**은 0이 아닌 성분(nonzero entry)을 하나 이상 가지고 있는 행을 의미하고, **zero 행(zero row)**은 모든 성분이 0인 행을 의미한다. (비슷하게, **nonzero 열(nonzero column)**은 0이 아닌 성분(nonzero entry)을 하나 이상 가지고 있는 열을, **zero 열(zero column)**은 모든 성분이 0인 열을 의미한다.) 그리고 nonzero 행에서, **leading entry**는 가장 왼쪽에 있는 0이 아닌 성분(nonzero entry)을 의미한다.

echelon form에 있는 행렬을 **echelon matrix** 라 한다.

</div></li>

<li><div markdown="block">

echelon form에서 다음 조건들이 추가로 만족되면 해당 행렬은 **reduced echelon form** 또는 **reduced row echelon form(RREF)**에 있다고 한다.

- 모든 leading entry는 1이다.
- 각 열에서 leading entry 1를 제외하고 나머지 항목은 모두 0이다.

reduced echelon form에 있는 행렬을 **reduced echelon matrix**라 한다.

</div></li>

<li><div markdown="block">

echelon matrix의 예

$$\begin{bmatrix}
1 & 0 & -7 &  8\\[0.5em]
0 & 1 & -4 &  4\\[0.5em]
0 & 0 &  6 & -6\\[0.5em]
\end{bmatrix}
\quad
\begin{bmatrix}
2 & 0 &  3 & 2 & 3 & 2\\[0.5em]
0 & 1 & -4 & 2 & 1 & 5\\[0.5em]
0 & 0 &  0 & 0 & 3 & 1\\[0.5em]
0 & 0 &  0 & 0 & 0 & 0\\[0.5em]
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

reduced echelon matrix의 예

$$\begin{bmatrix}
1 & 0 & 0 &  1\\[0.5em]
0 & 1 & 0 &  0\\[0.5em]
0 & 0 & 1 & -1\\[0.5em]
\end{bmatrix}
\quad
\begin{bmatrix}
1 & 0 &  3 & 1 & 0 & 1\\[0.5em]
0 & 1 & -4 & 2 & 0 & 5\\[0.5em]
0 & 0 &  0 & 0 & 1 & 3\\[0.5em]
0 & 0 &  0 & 0 & 0 & 0\\[0.5em]
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

위 예들에서 볼 수 있듯이, (reduced) echelon form이 된 행렬은 삼각형 모양이 된다.

</div></li>

<li><div markdown="block">

모든 nonzero 행렬은 일련의 elementary row operation을 통해 (reduced) echelon form으로 바꿀 수 있다. 이렇게 행렬을 (reduced) echelon form으로 바꾸는 것을 **row reduce**한다고 한다.

</div></li>

<li><div markdown="block">

**한 행렬의 echelon form은 다양하다**. elementary row operation을 적용하는 순서를 바꾸면 다양한 echelon form을 얻을 수 있다.

하지만 **한 행렬의 reduced echelon form은 유일하다**. 즉 어떠한 순서로 elementary row operation을 적용하든 동일한 reduced echelon form을 얻을 수 있다.

</div></li>

</ul>

# row reduction algorithm

<ul>

<li><div markdown="block">

한 행렬이 주어졌을 때, 이 행렬을 (reduced) echelon form으로 바꾸었을 때 leading entry가 있는 위치의 값을 **pivot**이라 한다. 그리고 pivot의 위치, 즉 (reduced) echelon form으로 바꾸었을 때 leading entry의 위치를 **pivot position**이라 한다. 또 pivot이 있는 열을 **pivot column**이라 한다.

예를 들어, 다음과 같은 행렬이 주어졌다고 해 보자.

$$\begin{bmatrix}
0 & -3 &  -6 & 4 & 9\\[0.5em]
-1 & -2 & -1 & 3 & 1\\[0.5em]
-2 & -3 &  0 & 3 & -1\\[0.5em]
1 & 4 &  5 & -9 & -7\\[0.5em]
\end{bmatrix}$$

일련의 elementary row operation을 적용하면 이 행렬을 다음과 같이 echelon form으로 바꿀 수 있다.

$$\begin{bmatrix}
1 & 4 & 5 & -9 & -7\\[0.5em]
0 & 2 & 4 & -6 & -6\\[0.5em]
0 & 0 & 0 & -5 &  0\\[0.5em]
0 & 0 & 0 &  0 &  0\\[0.5em]
\end{bmatrix}$$

따라서 pivot은 0, -2, 3이 되고, pivot position, pivot column은 각각 다음과 같다.

$$\begin{bmatrix}
\columncolor{ {{ site.data.mathjax.highlightColor1 }} } \cellcolor{#FFF29F} 0 & \columncolor{ {{ site.data.mathjax.highlightColor1 }} }-3 &  -6 & \columncolor{ {{ site.data.mathjax.highlightColor1 }} }4 & 9\\[0.5em]
-1 & \cellcolor{#FFF29F}-2 & -1 & 3 & 1\\[0.5em]
-2 & -3 &  0 & \cellcolor{#FFF29F} 3 & -1\\[0.5em]
1 & 4 &  5 & -9 & -7\\[0.5em]
\end{bmatrix}$$

</div></li>

<li><div markdown="block">

다음 일련의 절차대로 elementary row operation을 적용하면  임의의 행렬을 항상 reduced echelon form으로 만들 수 있다. 이를 **row reduction algorithm**이라 한다. row reduction algorithm은 다음과 같이 작동한다.

1. 가장 왼쪽에 있는 nonzero 열부터 시작한다. 이 열은 pivot column이 된다. 이 열의 가장 위는 pivot position이 된다.
2. 이 열의 nonzero 성분 중 하나를 선택해, (필요하다면) interchange 연산을 통해 선택된 성분이 있는 행을 가장 위로 올린다. 선택된 nonzero 성분은 pivot이 된다.
3. replacement 연산을 통해 pivot column에서 pivot 밑에 있는 성분들을 모두 0으로 만든다.
4. 이제 pivot position이 있는 행과 그 위 행들을 모두 가리고, submatrix에 대해 더이상 수정할 nonzero 행이 없어질 때까지 위 1 ~ 4 과정을 반복한다.
5. 가장 오른쪽에 위치한 pivot에서부터 왼쪽 위로 올라가면서, pivot column에서 pivot 위에 있는 성분들을 모두 0으로 만든다. 만약 pivot이 1이 아니라면 scaling 연산을 이용해 pivot을 1로 만든다.
6. reduced echelon form이 만들어진다.

참고로 1~4번 과정을 forward phase, 5번 과정을 backward phase라 한다.

</div></li>

<li><div markdown="block">

예를 들어, row reduction algorithm을 적용해 다음 행렬을 reduced echelon form으로 바꿔보자.

$$\begin{bmatrix}
0 & 3 & -6 & 6 & 4 & -5\\[0.5em]
3 & -7 & 8 & -5 & 8 & 9\\[0.5em]
3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
\end{bmatrix}$$

(1번 과정) 1열이 pivot column이 되고, 1행 1열이 pivot position이 된다.

$$\begin{bmatrix}
\columncolor{ {{ site.data.mathjax.highlightColor1 }} } \cellcolor{#FFF29F} 0 & 3 & -6 & 6 & 4 & -5\\[0.5em]
3 & -7 & 8 & -5 & 8 & 9\\[0.5em]
3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
\end{bmatrix}$$

(2번 과정) interchange 연산을 통해 3행과 1행을 바꾼다(2행과 1행을 바꿔도 된다). 그 결과 3이 pivot이 되었다.

$$\begin{bmatrix}
\columncolor{ {{ site.data.mathjax.highlightColor1 }} } \cellcolor{#FFF29F} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
3 & -7 & 8 & -5 & 8 & 9\\[0.5em]
0 & 3 & -6 & 6 & 4 & -5\\[0.5em]
\end{bmatrix}$$

(3번 과정) 2행에 1행과의 replacement 연산을 적용해 2행 1열의 값을 0으로 만든다. 3행 1열은 이미 0이므로 추가적인 연산을 수행할 필요가 없다.

$$\begin{bmatrix}
\columncolor{ {{ site.data.mathjax.highlightColor1 }} } \cellcolor{#FFF29F} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
0 & 2 & -4 & 4 & 2 & -6\\[0.5em]
0 & 3 & -6 & 6 & 4 & -5\\[0.5em]
\end{bmatrix}$$

(4번 과정) 1행을 가린다.

$$\begin{bmatrix}
\rowcolor{#dddddd} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
0 & 2 & -4 & 4 & 2 & -6\\[0.5em]
0 & 3 & -6 & 6 & 4 & -5\\[0.5em]
\end{bmatrix}$$

(1, 2번 과정) 2열은 새로운 pivot column이 되고, 2행 2열은 새로운 pivot position이 된다. 2는 새로운 pivot이 된다(interchange 연산을 굳이 수행하지 않아도 된다).

$$\begin{bmatrix}
\rowcolor{#dddddd} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
0 & \columncolor{ {{ site.data.mathjax.highlightColor1 }} } \cellcolor{#FFF29F} 2 & -4 & 4 & 2 & -6\\[0.5em]
0 & 3 & -6 & 6 & 4 & -5\\[0.5em]
\end{bmatrix}$$

(3번 과정) 3행에 2행과의 replacement 연산을 적용해 3행 2열의 값을 0으로 만든다.

$$\begin{bmatrix}
\rowcolor{#dddddd} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
0 & \columncolor{ {{ site.data.mathjax.highlightColor1 }} } \cellcolor{#FFF29F} 2 & -4 & 4 & 2 & -6\\[0.5em]
0 & 0 & 0 & 0 & 1 & 4\\[0.5em]
\end{bmatrix}$$

(4번 과정) 1, 2행을 가린다.

$$\begin{bmatrix}
\rowcolor{#dddddd} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
\rowcolor{#dddddd} 0 &  2 & -4 & 4 & 2 & -6\\[0.5em]
0 & 0 & 0 & 0 & 1 & 4\\[0.5em]
\end{bmatrix}$$

(1, 2, 3번 과정) 5열은 새로운 pivot column이 되고, 3행 5열은 새로운 pivot position이 된다. 1은 새로운 pivot이 된다(interchange 연산을 굳이 수행하지 않아도 된다). pivot 밑에 더 이상의 행이 없으므로 replacement 연산은 수행하지 않아도 된다.

$$\begin{bmatrix}
\rowcolor{#dddddd} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
\rowcolor{#dddddd} 0 &  2 & -4 & 4 & 2 & -6\\[0.5em]
0 & 0 & 0 & 0 & \cellcolor{#FFF29F} 1 & 4\\[0.5em]
\end{bmatrix}$$

(4번 과정) 1, 2, 3행을 가린다.

$$\begin{bmatrix}
\rowcolor{#dddddd} 3 & -9 & 12 & -9 & 6 &  15\\[0.5em]
\rowcolor{#dddddd} 0 &  2 & -4 & 4 & 2 & -6\\[0.5em]
\rowcolor{#dddddd} 0 & 0 & 0 & 0 & 1 & 4\\[0.5em]
\end{bmatrix}$$

이제 남은 nonzero 행이 없으므로 4번 과정을 종료한다.

(5번 과정) 5열에서부터 시작한다. replacement 연산을 적용하여 1행 5열, 2행 5열의 값을 모두 0으로 만든다.

$$\begin{bmatrix}
3 & -9 & 12 & -9 & \columncolor{ {{ site.data.mathjax.highlightColor1 }} } 0 & -9\\[0.5em]
0 &  2 & -4 & 4 & 0 & -14\\[0.5em]
0 & 0 & 0 & 0 & \cellcolor{#FFF29F} 1 & 4\\[0.5em]
\end{bmatrix}$$

2행에 scaling 연산을 적용하여 pivot을 1로 만든다.

$$\begin{bmatrix}
3 & \columncolor{ {{ site.data.mathjax.highlightColor1 }} } -9 & 12 & -9 & 0 & -9\\[0.5em]
0 & \cellcolor{#FFF29F} 1 & -2 & 2 & 0 & -7\\[0.5em]
0 & 0 & 0 & 0 & 1 & 4\\[0.5em]
\end{bmatrix}$$

replacement 연산을 적용하여 1행 2열의 값을 모두 0으로 만든다.

$$\begin{bmatrix}
3 & \columncolor{ {{ site.data.mathjax.highlightColor1 }} } 0 & -6 & 9 & 0 & -72\\[0.5em]
0 & \cellcolor{#FFF29F} 1 & -2 & 2 & 0 & -7\\[0.5em]
0 & 0 & 0 & 0 & 1 & 4\\[0.5em]
\end{bmatrix}$$

1행에 scaling 연산을 적용하여 pivot을 1로 만든다.

$$\begin{bmatrix}
\columncolor{ {{ site.data.mathjax.highlightColor1 }} } \cellcolor{#FFF29F} 1 & 0 & -2 & 3 & 0 & -24\\[0.5em]
0 & 1 & -2 & 2 & 0 & -7\\[0.5em]
0 & 0 & 0 & 0 & 1 & 4\\[0.5em]
\end{bmatrix}$$

최종적으로 얻어지는 행렬은 reduced echelon form이다.

$$\begin{bmatrix}
1 & 0 & -2 & 3 & 0 & -24\\[0.5em]
0 & 1 & -2 & 2 & 0 & -7\\[0.5em]
0 & 0 & 0 & 0 & 1 & 4\\[0.5em]
\end{bmatrix}$$

</div></li>

</ul>
