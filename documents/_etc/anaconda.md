---
title: "아나콘다(Anaconda) 리눅스(Ubuntu)에 설치하기"
tags: ["anaconda", "python", "framework", "linux", "ubuntu"]
date: "2020-08-31"
---

# 파이썬 가상환경 (Python Virtual Environment)

파이썬에서 패키지를 설치하기 위해서 일반적으로 pip를 많이 사용한다. pip는 패키지를 설치할 때 의존 관계에 있는 다른 패키지들까지 자동으로 설치해 주어 아주 편리하다. pip으로 설치한 패키지는 "site-packages" 디렉토리에 저장된다. site-packages 디렉토리는 모든 파이썬 스크립트가 참조할 수 있는 디렉토리이기에, 시스템에 한번 설치한 패키지는 다른 스크립트에서도 사용할 수 있다.

그런데 이렇게 모든 패키지를 site-packages 디렉토리에 저장하는 방식은 버전 문제가 발생할 수 있다. 패키지 X의 1.5버전을 사용하는 프로젝트 A와 패키지 X의 2.0버전을 사용하는 프로젝트 B를 동시에 개발해야 하는 상황을 생각해보자. site-packages에는 한 패키지에 대해 한 가지 버전만 설치할 수 있기 때문에, X의 1.5버전과 2.0버전은 시스템에 동시에 설치될 수 없다. 만약 X의 2.0버전이 하위호환(backward compatible)되지 않는다면, 두 프로젝트 중 하나는 X의 사용을 포기해야 한다.

파이썬에서는 이런 문제를 막기 위해 "가상 환경(Virtual Environment)"을 제공한다. 가상환경은 격리된 작업공간으로서 독립된 파이썬 인터프리터와 site-packages 디렉토리를 가진다.[^1] 위의 예에서, 프로젝트 A와 B에 대해 각각 가상공간을 생성하면 패키지의 버전 충돌 문제를 해결할 수 있다.

[^1]: 조금 더 구체적으로 설명하면, 파이썬 스크립트는 환경변수 등을 이용해 파이썬 인터프리터가 있는 위치와 site-packages 디렉토리가 있는 위치를 기억하고 있다. 가상환경을 만들면 가상환경 관리자는 파이썬 인터프리터와 site-packages 디렉토리를 가상환경 내부 디렉토리로 복사한다. 이후 가상환경이 활성화(activate)되면 환경변수 등이 복사된 가상환경 내부의 파이썬 인터프리터와 site-packages 디렉토리를 이용하도록 자동으로 조정되어, 시스템에 글로벌하게 설치된 기존 파이썬 인터프리터와 site-packages 경로를 덮어쓰게(override) 된다. 가상환경을 비활성화(deactivate)하면 다시 원래대로 돌아간다.

이외에도 가상환경은 다음과 같은 장점을 가진다.

- 가상환경에는 독립적인 파이썬 인터프리터가 포함되므로, 각 가상환경당 다른 버전의 파이썬을 사용하게 할 수도 있다. 즉, 프로젝트 별로 다른 버전의 파이썬을 사용하여 개발할 수 있다.
- 응용 프로그램을 배포할 때 사용자의 환경이 개발 환경과 동일한 환경이 되도록 설정할 수 있다. 사실 가상환경의 원래 개발 목표는 이것이었다. 그래서 파이썬 인터프리터가 포함되도록 설계된 것이다. 사용자 컴퓨터에 설치되어 있는 버전이 몇인지도 모르는 파이썬 인터프리터와 site-packages의 패키지들을 가지고 스크립트를 실행하는 것이 아니라, 개발할 때의 환경과 동일한 특정 파이썬 인터프리터 버전과 특정 패키지만 설치된 깨끗한 가상환경 안에서 스크립트를 실행하면 사용자 컴퓨터에서도 정확한 실행을 보장할 수 있다.
- 패키지 설치 시 권한 문제가 해결된다. site-packages 디렉토리는 종종 root 권한이 필요한 디렉토리 밑에 존재한다. 이 경우 root 권한이 없는 사용자의 경우 설치된 패키지를 사용(read)할 수는 있지만, 새로운 패키지를 설치할(write) 수는 없는 문제가 발생한다. 하지만 가상환경을 사용하면 가상환경 디렉토리 밑에 site-packages 디렉토리가 위치하게 되는데, 일반적으로 가상환경 디렉토리는 사용자의 홈 디렉토리 밑에 있기에 권한 문제 없이 패키지를 설치할 수 있다.[^2]

[^2]: 이 문제 때문에 요즘에는 파이썬을 설치하면 site-packages가 기본으로 사용자 디렉토리 밑에 위치하는 경우가 많다. 윈도우의 경우 (기본 설치 옵션에서 아무것도 수정하지 않았을 경우) `%LOCALAPPDATA%\Programs\Python\PythonXY-Z\Lib\` 디렉토리 밑에 site-packages 디렉토리가 위치하고, 우분투의 경우 `$HOME/.local/lib/pythonX.Y/` 디렉토리 밑에 site-packages 디렉토리가 위치한다.

# 아나콘다(Anaconda)란?

아나콘다란 파이썬 가상환경 관리자(Virtual Environment Manager)의 일종이다. 아나콘다를 이용하면 손쉽게 파이썬 가상환경을 생성, 활성화(activate), 비활성화(deactivate)시킬 수 있다. 아나콘다는 또한 pip과 같은 패키지 관리자(Package Manager)이자 7,500개 이상의 오픈 소스 패키지들의 집합(collection)이기도 하다. 아나콘다는 파이썬으로 데이터 과학(Data Science)를 수행할 때 가장 많이 사용하는 가상환경 관리자이다.

# 아나콘다 설치하기

2020년 9월 현재 최신 아나콘다 버전은 파이썬 3.8에 대응하는 2020.07 버전이다. 아나콘다 설치 파일은 아나콘다 홈페이지의 [다운로드 페이지](https://www.anaconda.com/products/individual#Downloads)에서 받을 수 있다.[^3] 또는 다음과 같이 `curl`을 이용해 다운로드할 수도 있다.

[^3]: 구버전의 아나콘다는 <https://repo.anaconda.com/archive/>에서 받을 수 있다.

{% highlight bash %}
$ curl -O https://repo.anaconda.com/archive/Anaconda3-2020.07-Linux-x86_64.sh
$ if [[ "$(md5sum Anaconda3-2020.07-Linux-x86_64.sh | cut -d' ' -f1)" == "1046c40a314ab2531e4c099741530ada" ]]; then echo "OK"; else echo "No"; fi  # 무결성 검사 : OK가 나와야 함
{% endhighlight %}

다운로드한 `Anaconda3-2020.07-Linux-x86_64.sh` 파일에 다음과 같이 실행권한을 부여한 후 실행하면 설치가 시작된다.

{% highlight bash %}
$ chmod +x Anaconda3-2020.07-Linux-x86_64.sh  # 실행 권한 부여
$ ./Anaconda3-2020.07-Linux-x86_64.sh
{% endhighlight %}

이후 안내에 따라 설치를 진행하면 된다.

<div class="collapsable">
<p class="collapsable-btn">설치 과정 자세히 보기/닫기</p>
<div class="content">

<p>설치를 시작하면 우선 라이선스 조건을 검토하라는 안내가 뜬다.</p>

{% highlight text %}
Welcome to Anaconda3 2020.07

In order to continue the installation process, please review the license
agreement.
Please, press ENTER to continue
>>> 
{% endhighlight %}

<p>엔터 키를 누르면 라이선스 조항을 읽을 수 있다. <code class="language-plaintext highlighter-rouge">MORE</code>이 나오면 스페이스 바를 눌러 다음 페이지로 이동할 수 있다.</p>

{% highlight text %}
===================================
End User License Agreement - Anaconda Individual Edition
===================================

Copyright 2015-2020, Anaconda, Inc.

All rights reserved under the 3-clause BSD License:

This End User License Agreement (the "Agreement") is a legal agreement between you and Anaconda, Inc. ("Anaconda") and governs your use of Anaconda Individual Edition (which was formerly known as Anacond
a Distribution).

Subject to the terms of this Agreement, Anaconda hereby grants you a non-exclusive, non-transferable license to:

  * Install and use the Anaconda Individual Edition (which was formerly known as Anaconda Distribution),
  * Modify and create derivative works of sample source code delivered in Anaconda Individual Edition from Anaconda's repository; and
  * Redistribute code files in source (if provided to you by Anaconda as source) and binary forms, with or without modification subject to the requirements set forth below.

Anaconda may, at its option, make available patches, workarounds or other updates to Anaconda Individual Edition. Unless the updates are provided with their separate governing terms, they are deemed part
 of Anaconda Individual Edition licensed to you as provided in this Agreement.  This Agreement does not entitle you to any support for Anaconda Individual Edition.

Anaconda reserves all rights not expressly granted to you in this Agreement.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distributi
on.
  * Neither the name of Anaconda nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

You acknowledge that, as between you and Anaconda, Anaconda owns all right, title, and interest, including all intellectual property rights, in and to Anaconda Individual Edition and, with respect to thi
rd-party products distributed with or through Anaconda Individual Edition, the applicable third-party licensors own all right, title and interest, including all intellectual property rights, in and to su
ch products.  If you send or transmit any communications or materials to Anaconda suggesting or recommending changes to the software or documentation, including without limitation, new features or functi
onality relating thereto, or any comments, questions, suggestions or the like ("Feedback"), Anaconda is free to use such Feedback. You hereby assign to Anaconda all right, title, and interest in, and Ana
conda is free to use, without any attribution or compensation to any party, any ideas, know-how, concepts, techniques or other intellectual property rights contained in the Feedback, for any purpose what
soever, although Anaconda is not required to use any Feedback.

THIS SOFTWARE IS PROVIDED BY ANACONDA AND ITS CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTIC
ULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANACONDA BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTIT
UTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHE
RWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

TO THE MAXIMUM EXTENT PERMITTED BY LAW, ANACONDA AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES, OR ANY LOST PROFITS, LOSS OF USE, LOSS OF DATA OR L
OSS OF GOODWILL, OR THE COSTS OF PROCURING SUBSTITUTE PRODUCTS, ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR THE USE OR PERFORMANCE OF ANACONDA INDIVIDUAL EDITION, WHETHER SUCH LIABILITY ARISES
 FROM ANY CLAIM BASED UPON BREACH OF CONTRACT, BREACH OF WARRANTY, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER CAUSE OF ACTION OR THEORY OF LIABILITY. IN NO EVENT WILL THE TOTAL CUMULATIV
E LIABILITY OF ANACONDA AND ITS AFFILIATES UNDER OR ARISING OUT OF THIS AGREEMENT EXCEED US.00.

If you want to terminate this Agreement, you may do so by discontinuing use of Anaconda Individual Edition.  Anaconda may, at any time, terminate this Agreement and the license granted hereunder if you f
ail to comply with any term of this Agreement.   Upon any termination of this Agreement, you agree to promptly discontinue use of the Anaconda Individual Edition and destroy all copies in your possession
 or control. Upon any termination of this Agreement all provisions survive except for the licenses granted to you.

This Agreement is governed by and construed in accordance with the internal laws of the State of Texas without giving effect to any choice or conflict of law provision or rule that would require or permi
t the application of the laws of any jurisdiction other than those of the State of Texas. Any legal suit, action, or proceeding arising out of or related to this Agreement or the licenses granted hereund
er by you must be instituted exclusively in the federal courts of the United States or the courts of the State of Texas in each case located in Travis County, Texas, and you irrevocably submit to the jur
isdiction of such courts in any such suit, action, or proceeding.


Notice of Third Party Software Licenses
=======================================

Anaconda Individual Edition provides access to a repository which contains software packages or tools licensed on an open source basis from third parties and binary packages of these third party tools. T
hese third party software packages or tools are provided on an "as is" basis and are subject to their respective license agreements as well as this Agreement and the Terms of Service for the Repository l
ocated at https://know.anaconda.com/TOS.html. These licenses may be accessed from within the Anaconda Individual Edition software or at https://docs.anaconda.com/anaconda/pkg-docs. Information regarding 
which license is applicable is available from within many of the third party software packages and tools and at https://repo.anaconda.com/pkgs/main/ and https://repo.anaconda.com/pkgs/r/. Anaconda reserv
es the right, in its sole discretion, to change which third party tools are included in the repository accessible through Anaconda Individual Edition.

Intel Math Kernel Library
-------------------------

Anaconda Individual Edition provides access to re-distributable, run-time, shared-library files from the Intel Math Kernel Library ("MKL binaries").

Copyright 2018 Intel Corporation.  License available at https://software.intel.com/en-us/license/intel-simplified-software-license (the "MKL License").

You may use and redistribute the MKL binaries, without modification, provided the following conditions are met:

  * Redistributions must reproduce the above copyright notice and the following terms of use in the MKL binaries and in the documentation and/or other materials provided with the distribution.
  * Neither the name of Intel nor the names of its suppliers may be used to endorse or promote products derived from the MKL binaries without specific prior written permission.
  * No reverse engineering, decompilation, or disassembly of the MKL binaries is permitted.

You are specifically authorized to use and redistribute the MKL binaries with your installation of Anaconda Individual Edition subject to the terms set forth in the MKL License. You are also authorized t
o redistribute the MKL binaries with Anaconda Individual Edition or in the Anaconda package that contains the MKL binaries. If needed, instructions for removing the MKL binaries after installation of Ana
conda Individual Edition are available at https://docs.anaconda.com.

cuDNN Software
--------------

Anaconda Individual Edition also provides access to cuDNN software binaries ("cuDNN binaries") from NVIDIA Corporation. You are specifically authorized to use the cuDNN binaries with your installation of
 Anaconda Individual Edition subject to your compliance with the license agreement located at https://docs.nvidia.com/deeplearning/sdk/cudnn-sla/index.html. You are also authorized to redistribute the cu
DNN binaries with an Anaconda Individual Edition package that contains the cuDNN binaries. You can add or remove the cuDNN binaries utilizing the install and uninstall features in Anaconda Individual Edi
tion.

cuDNN binaries contain source code provided by NVIDIA Corporation.


Export; Cryptography Notice
===================

You must comply with all domestic and international export laws and regulations that apply to the software, which include restrictions on destinations, end users, and end use.  Anaconda Individual Editio
n includes cryptographic software. The country in which you currently reside may have restrictions on the import, possession, use, and/or re-export to another country, of encryption software. BEFORE usin
g any encryption software, please check your country's laws, regulations and policies concerning the import, possession, or use, and re-export of encryption software, to see if this is permitted. See the
 Wassenaar Arrangement http://www.wassenaar.org/ for more information.

Anaconda has self-classified this software as Export Commodity Control Number (ECCN) 5D992.c, which includes mass market information security software using or performing cryptographic functions with asy
mmetric algorithms. No license is required for export of this software to non-embargoed countries. The Intel Math Kernel Library contained in Anaconda Individual Edition is classified by Intel as ECCN 5D
992.c with no license required for export to non-embargoed countries.

The following packages are included in the repository accessible through Anaconda Individual Edition that relate to cryptography:

openssl
    The OpenSSL Project is a collaborative effort to develop a robust, commercial-grade, full-featured, and Open Source toolkit implementing the Transport Layer Security (TLS) and Secure Sockets Layer (S
SL) protocols as well as a full-strength general purpose cryptography library.

pycrypto
    A collection of both secure hash functions (such as SHA256 and RIPEMD160), and various encryption algorithms (AES, DES, RSA, ElGamal, etc.).

pyopenssl
    A thin Python wrapper around (a subset of) the OpenSSL library.

kerberos (krb5, non-Windows platforms)
    A network authentication protocol designed to provide strong authentication for client/server applications by using secret-key cryptography.

cryptography
    A Python library which exposes cryptographic recipes and primitives.

pycryptodome
    A fork of PyCrypto. It is a self-contained Python package of low-level cryptographic primitives.

pycryptodomex
    A stand-alone version of pycryptodome.

libsodium
    A software library for encryption, decryption, signatures, password hashing and more.

pynacl
    A Python binding to the Networking and Cryptography library, a crypto library with the stated goal of improving usability, security and speed.

Last updated May 20, 2020
{% endhighlight %}

<p>조항을 끝까지 다 읽으면 다음과 같이 조항에 동의하는지를 묻는다. "yes"를 입력하자.</p>

{% highlight text %}
Do you accept the license terms? [yes|no]
[no] >>>
{% endhighlight %}

<p>그럼 다음과 같이 아나콘다를 설치할 위치를 선택하는 질문이 뜬다.</p>

{% highlight text %}
Anaconda3 will now be installed into this location:
/home/ubuntu/anaconda3

  - Press ENTER to confirm the location
  - Press CTRL-C to abort the installation
  - Or specify a different location below

[/home/ubuntu/anaconda3] >>>
{% endhighlight %}

<p>디폴트 위치는 <code class="language-plaintext highlighter-rouge">$HOME/anaconda3</code>이다. 이 경로가 마음에 들면 엔터 키를 눌러 진행하자. 만약 다른 위치를 사용하고 싶다면 해당 경로를 입력하고 엔터 키를 누르자. 참고로 다른 위치를 사용할 때는 그 위치에 내가 읽기/쓰기 권한이 있는지를 잘 확인해야 한다. 권한이 없다면 설치가 정상적으로 진행되지 않는다.</p>

<p>이제 설치가 시작된다. 설치 과정을 보면 알겠지만 기본으로 정말 많은 패키지들이 설치된다. 약간의 시간이 걸리니 잠시 커피 한잔 마시면서 여유를 즐기자.</p>

{% highlight text %}
PREFIX=/home/ubuntu/anaconda3
Unpacking payload ...
Collecting package metadata (current_repodata.json): done                                                                                                                                                  
Solving environment: done

## Package Plan ##

  environment location: /home/ubuntu/anaconda3

  added / updated specs:
    - _ipyw_jlab_nb_ext_conf==0.1.0=py38_0
    - _libgcc_mutex==0.1=main
    - alabaster==0.7.12=py_0
    - anaconda-client==1.7.2=py38_0
    - anaconda-navigator==1.9.12=py38_0
    - anaconda-project==0.8.4=py_0
    - anaconda==2020.07=py38_0
    - argh==0.26.2=py38_0
    - asn1crypto==1.3.0=py38_0
    - astroid==2.4.2=py38_0
    - astropy==4.0.1.post1=py38h7b6447c_1
    - atomicwrites==1.4.0=py_0
    - attrs==19.3.0=py_0
    - autopep8==1.5.3=py_0
    - babel==2.8.0=py_0
    - backcall==0.2.0=py_0
    - backports.functools_lru_cache==1.6.1=py_0
    - backports.shutil_get_terminal_size==1.0.0=py38_2
    - backports.tempfile==1.0=py_1
    - backports.weakref==1.0.post1=py_1
    - backports==1.0=py_2
    - beautifulsoup4==4.9.1=py38_0
    - bitarray==1.4.0=py38h7b6447c_0
    - bkcharts==0.2=py38_0
    - blas==1.0=mkl
    - bleach==3.1.5=py_0
    - blosc==1.19.0=hd408876_0
    - bokeh==2.1.1=py38_0
    - boto==2.49.0=py38_0
    - bottleneck==1.3.2=py38heb32a55_1
    - brotlipy==0.7.0=py38h7b6447c_1000
    - bzip2==1.0.8=h7b6447c_0
    - ca-certificates==2020.6.24=0
    - cairo==1.14.12=h8948797_3
    - certifi==2020.6.20=py38_0
    - cffi==1.14.0=py38he30daa8_1
    - chardet==3.0.4=py38_1003
    - click==7.1.2=py_0
    - cloudpickle==1.5.0=py_0
    - clyent==1.2.2=py38_1
    - colorama==0.4.3=py_0
    - conda-build==3.18.11=py38_0
    - conda-env==2.6.0=1
    - conda-package-handling==1.6.1=py38h7b6447c_0
    - conda-verify==3.4.2=py_1
    - conda==4.8.3=py38_0
    - contextlib2==0.6.0.post1=py_0
    - cryptography==2.9.2=py38h1ba5d50_0
    - curl==7.71.1=hbc83047_1
    - cycler==0.10.0=py38_0
    - cython==0.29.21=py38he6710b0_0
    - cytoolz==0.10.1=py38h7b6447c_0
    - dask-core==2.20.0=py_0
    - dask==2.20.0=py_0
    - dbus==1.13.16=hb2f20db_0
    - decorator==4.4.2=py_0
    - defusedxml==0.6.0=py_0
    - diff-match-patch==20200713=py_0
    - distributed==2.20.0=py38_0
    - docutils==0.16=py38_1
    - entrypoints==0.3=py38_0
    - et_xmlfile==1.0.1=py_1001
    - expat==2.2.9=he6710b0_2
    - fastcache==1.1.0=py38h7b6447c_0
    - filelock==3.0.12=py_0
    - flake8==3.8.3=py_0
    - flask==1.1.2=py_0
    - fontconfig==2.13.0=h9420a91_0
    - freetype==2.10.2=h5ab3b9f_0
    - fribidi==1.0.9=h7b6447c_0
    - fsspec==0.7.4=py_0
    - future==0.18.2=py38_1
    - get_terminal_size==1.0.0=haa9412d_0
    - gevent==20.6.2=py38h7b6447c_0
    - glib==2.65.0=h3eb4bd4_0
    - glob2==0.7=py_0
    - gmp==6.1.2=h6c8ec71_1
    - gmpy2==2.0.8=py38hd5f6e3b_3
    - graphite2==1.3.14=h23475e2_0
    - greenlet==0.4.16=py38h7b6447c_0
    - gst-plugins-base==1.14.0=hbbd80ab_1
    - gstreamer==1.14.0=hb31296c_0
    - h5py==2.10.0=py38h7918eee_0
    - harfbuzz==2.4.0=hca77d97_1
    - hdf5==1.10.4=hb1b8bf9_0
    - heapdict==1.0.1=py_0
    - html5lib==1.1=py_0
    - icu==58.2=he6710b0_3
    - idna==2.10=py_0
    - imageio==2.9.0=py_0
    - imagesize==1.2.0=py_0
    - importlib-metadata==1.7.0=py38_0
    - importlib_metadata==1.7.0=0
    - intel-openmp==2020.1=217
    - intervaltree==3.0.2=py_1
    - ipykernel==5.3.2=py38h5ca1d4c_0
    - ipython==7.16.1=py38h5ca1d4c_0
    - ipython_genutils==0.2.0=py38_0
    - ipywidgets==7.5.1=py_0
    - isort==4.3.21=py38_0
    - itsdangerous==1.1.0=py_0
    - jbig==2.1=hdba287a_0
    - jdcal==1.4.1=py_0
    - jedi==0.17.1=py38_0
    - jeepney==0.4.3=py_0
    - jinja2==2.11.2=py_0
    - joblib==0.16.0=py_0
    - jpeg==9b=h024ee3a_2
    - json5==0.9.5=py_0
    - jsonschema==3.2.0=py38_0
    - jupyter==1.0.0=py38_7
    - jupyter_client==6.1.6=py_0
    - jupyter_console==6.1.0=py_0
    - jupyter_core==4.6.3=py38_0
    - jupyterlab==2.1.5=py_0
    - jupyterlab_server==1.2.0=py_0
    - keyring==21.2.1=py38_0
    - kiwisolver==1.2.0=py38hfd86e86_0
    - krb5==1.18.2=h173b8e3_0
    - lazy-object-proxy==1.4.3=py38h7b6447c_0
    - lcms2==2.11=h396b838_0
    - ld_impl_linux-64==2.33.1=h53a641e_7
    - libarchive==3.4.2=h62408e4_0
    - libcurl==7.71.1=h20c2e04_1
    - libedit==3.1.20191231=h14c3975_1
    - libffi==3.3=he6710b0_2
    - libgcc-ng==9.1.0=hdf63c60_0
    - libgfortran-ng==7.3.0=hdf63c60_0
    - liblief==0.10.1=he6710b0_0
    - libllvm9==9.0.1=h4a3c616_1
    - libpng==1.6.37=hbc83047_0
    - libsodium==1.0.18=h7b6447c_0
    - libspatialindex==1.9.3=he6710b0_0
    - libssh2==1.9.0=h1ba5d50_1
    - libstdcxx-ng==9.1.0=hdf63c60_0
    - libtiff==4.1.0=h2733197_1
    - libtool==2.4.6=h7b6447c_5
    - libuuid==1.0.3=h1bed415_2
    - libxcb==1.14=h7b6447c_0
    - libxml2==2.9.10=he19cac6_1
    - libxslt==1.1.34=hc22bd24_0
    - llvmlite==0.33.0=py38hc6ec683_1
    - locket==0.2.0=py38_1
    - lxml==4.5.2=py38hefd8a0e_0
    - lz4-c==1.9.2=he6710b0_0
    - lzo==2.10=h7b6447c_2
    - markupsafe==1.1.1=py38h7b6447c_0
    - matplotlib-base==3.2.2=py38hef1b27d_0
    - matplotlib==3.2.2=0
    - mccabe==0.6.1=py38_1
    - mistune==0.8.4=py38h7b6447c_1000
    - mkl-service==2.3.0=py38he904b0f_0
    - mkl==2020.1=217
    - mkl_fft==1.1.0=py38h23d657b_0
    - mkl_random==1.1.1=py38h0573a6f_0
    - mock==4.0.2=py_0
    - more-itertools==8.4.0=py_0
    - mpc==1.1.0=h10f8cd9_1
    - mpfr==4.0.2=hb69a4c5_1
    - mpmath==1.1.0=py38_0
    - msgpack-python==1.0.0=py38hfd86e86_1
    - multipledispatch==0.6.0=py38_0
    - navigator-updater==0.2.1=py38_0
    - nbconvert==5.6.1=py38_0
    - nbformat==5.0.7=py_0
    - ncurses==6.2=he6710b0_1
    - networkx==2.4=py_1
    - nltk==3.5=py_0
    - nose==1.3.7=py38_2
    - notebook==6.0.3=py38_0
    - numba==0.50.1=py38h0573a6f_1
    - numexpr==2.7.1=py38h423224d_0
    - numpy-base==1.18.5=py38hde5b4d6_0
    - numpy==1.18.5=py38ha1c710e_0
    - numpydoc==1.1.0=py_0
    - olefile==0.46=py_0
    - openpyxl==3.0.4=py_0
    - openssl==1.1.1g=h7b6447c_0
    - packaging==20.4=py_0
    - pandas==1.0.5=py38h0573a6f_0
    - pandoc==2.10=0
    - pandocfilters==1.4.2=py38_1
    - pango==1.45.3=hd140c19_0
    - parso==0.7.0=py_0
    - partd==1.1.0=py_0
    - patchelf==0.11=he6710b0_0
    - path.py==12.4.0=0
    - path==13.1.0=py38_0
    - pathlib2==2.3.5=py38_0
    - pathtools==0.1.2=py_1
    - patsy==0.5.1=py38_0
    - pcre==8.44=he6710b0_0
    - pep8==1.7.1=py38_0
    - pexpect==4.8.0=py38_0
    - pickleshare==0.7.5=py38_1000
    - pillow==7.2.0=py38hb39fc2d_0
    - pip==20.1.1=py38_1
    - pixman==0.40.0=h7b6447c_0
    - pkginfo==1.5.0.1=py38_0
    - pluggy==0.13.1=py38_0
    - ply==3.11=py38_0
    - prometheus_client==0.8.0=py_0
    - prompt-toolkit==3.0.5=py_0
    - prompt_toolkit==3.0.5=0
    - psutil==5.7.0=py38h7b6447c_0
    - ptyprocess==0.6.0=py38_0
    - py-lief==0.10.1=py38h403a769_0
    - py==1.9.0=py_0
    - pycodestyle==2.6.0=py_0
    - pycosat==0.6.3=py38h7b6447c_1
    - pycparser==2.20=py_2
    - pycurl==7.43.0.5=py38h1ba5d50_0
    - pydocstyle==5.0.2=py_0
    - pyflakes==2.2.0=py_0
    - pygments==2.6.1=py_0
    - pylint==2.5.3=py38_0
    - pyodbc==4.0.30=py38he6710b0_0
    - pyopenssl==19.1.0=py_1
    - pyparsing==2.4.7=py_0
    - pyqt==5.9.2=py38h05f1152_4
    - pyrsistent==0.16.0=py38h7b6447c_0
    - pysocks==1.7.1=py38_0
    - pytables==3.6.1=py38h9fd0a39_0
    - pytest==5.4.3=py38_0
    - python-dateutil==2.8.1=py_0
    - python-jsonrpc-server==0.3.4=py_1
    - python-language-server==0.34.1=py38_0
    - python-libarchive-c==2.9=py_0
    - python==3.8.3=hcff3b4d_2
    - pytz==2020.1=py_0
    - pywavelets==1.1.1=py38h7b6447c_0
    - pyxdg==0.26=py_0
    - pyyaml==5.3.1=py38h7b6447c_1
    - pyzmq==19.0.1=py38he6710b0_1
    - qdarkstyle==2.8.1=py_0
    - qt==5.9.7=h5867ecd_1
    - qtawesome==0.7.2=py_0
    - qtconsole==4.7.5=py_0
    - qtpy==1.9.0=py_0
    - readline==8.0=h7b6447c_0
    - regex==2020.6.8=py38h7b6447c_0
    - requests==2.24.0=py_0
    - ripgrep==11.0.2=he32d670_0
    - rope==0.17.0=py_0
    - rtree==0.9.4=py38_1
    - ruamel_yaml==0.15.87=py38h7b6447c_1
    - scikit-image==0.16.2=py38h0573a6f_0
    - scikit-learn==0.23.1=py38h423224d_0
    - scipy==1.5.0=py38h0b6359f_0
    - seaborn==0.10.1=py_0
    - secretstorage==3.1.2=py38_0
    - send2trash==1.5.0=py38_0
    - setuptools==49.2.0=py38_0
    - simplegeneric==0.8.1=py38_2
    - singledispatch==3.4.0.3=py38_0
    - sip==4.19.13=py38he6710b0_0
    - six==1.15.0=py_0
    - snappy==1.1.8=he6710b0_0
    - snowballstemmer==2.0.0=py_0
    - sortedcollections==1.2.1=py_0
    - sortedcontainers==2.2.2=py_0
    - soupsieve==2.0.1=py_0
    - sphinx==3.1.2=py_0
    - sphinxcontrib-applehelp==1.0.2=py_0
    - sphinxcontrib-devhelp==1.0.2=py_0
    - sphinxcontrib-htmlhelp==1.0.3=py_0
    - sphinxcontrib-jsmath==1.0.1=py_0
    - sphinxcontrib-qthelp==1.0.3=py_0
    - sphinxcontrib-serializinghtml==1.1.4=py_0
    - sphinxcontrib-websupport==1.2.3=py_0
    - sphinxcontrib==1.0=py38_1
    - spyder-kernels==1.9.2=py38_0
    - spyder==4.1.4=py38_0
    - sqlalchemy==1.3.18=py38h7b6447c_0
    - sqlite==3.32.3=h62c20be_0
    - statsmodels==0.11.1=py38h7b6447c_0
    - sympy==1.6.1=py38_0
    - tbb==2020.0=hfd86e86_0
    - tblib==1.6.0=py_0
    - terminado==0.8.3=py38_0
    - testpath==0.4.4=py_0
    - threadpoolctl==2.1.0=pyh5ca1d4c_0
    - tk==8.6.10=hbc83047_0
    - toml==0.10.1=py_0
    - toolz==0.10.0=py_0
    - tornado==6.0.4=py38h7b6447c_1
    - tqdm==4.47.0=py_0
    - traitlets==4.3.3=py38_0
    - typing_extensions==3.7.4.2=py_0
    - ujson==1.35=py38h7b6447c_0
    - unicodecsv==0.14.1=py38_0
    - unixodbc==2.3.7=h14c3975_0
    - urllib3==1.25.9=py_0
    - watchdog==0.10.3=py38_0
    - wcwidth==0.2.5=py_0
    - webencodings==0.5.1=py38_1
    - werkzeug==1.0.1=py_0
    - wheel==0.34.2=py38_0
    - widgetsnbextension==3.5.1=py38_0
    - wrapt==1.11.2=py38h7b6447c_0
    - wurlitzer==2.0.1=py38_0
    - xlrd==1.2.0=py_0
    - xlsxwriter==1.2.9=py_0
    - xlwt==1.3.0=py38_0
    - xmltodict==0.12.0=py_0
    - xz==5.2.5=h7b6447c_0
    - yaml==0.2.5=h7b6447c_0
    - yapf==0.30.0=py_0
    - zeromq==4.3.2=he6710b0_2
    - zict==2.0.0=py_0
    - zipp==3.1.0=py_0
    - zlib==1.2.11=h7b6447c_3
    - zope.event==4.4=py38_0
    - zope.interface==4.7.1=py38h7b6447c_0
    - zope==1.0=py38_1
    - zstd==1.4.5=h0b5b093_0


The following NEW packages will be INSTALLED:

  _ipyw_jlab_nb_ext~ pkgs/main/linux-64::_ipyw_jlab_nb_ext_conf-0.1.0-py38_0
  _libgcc_mutex      pkgs/main/linux-64::_libgcc_mutex-0.1-main
  alabaster          pkgs/main/noarch::alabaster-0.7.12-py_0
  anaconda           pkgs/main/linux-64::anaconda-2020.07-py38_0
  anaconda-client    pkgs/main/linux-64::anaconda-client-1.7.2-py38_0
  anaconda-navigator pkgs/main/linux-64::anaconda-navigator-1.9.12-py38_0
  anaconda-project   pkgs/main/noarch::anaconda-project-0.8.4-py_0
  argh               pkgs/main/linux-64::argh-0.26.2-py38_0
  asn1crypto         pkgs/main/linux-64::asn1crypto-1.3.0-py38_0
  astroid            pkgs/main/linux-64::astroid-2.4.2-py38_0
  astropy            pkgs/main/linux-64::astropy-4.0.1.post1-py38h7b6447c_1
  atomicwrites       pkgs/main/noarch::atomicwrites-1.4.0-py_0
  attrs              pkgs/main/noarch::attrs-19.3.0-py_0
  autopep8           pkgs/main/noarch::autopep8-1.5.3-py_0
  babel              pkgs/main/noarch::babel-2.8.0-py_0
  backcall           pkgs/main/noarch::backcall-0.2.0-py_0
  backports          pkgs/main/noarch::backports-1.0-py_2
  backports.functoo~ pkgs/main/noarch::backports.functools_lru_cache-1.6.1-py_0
  backports.shutil_~ pkgs/main/linux-64::backports.shutil_get_terminal_size-1.0.0-py38_2
  backports.tempfile pkgs/main/noarch::backports.tempfile-1.0-py_1
  backports.weakref  pkgs/main/noarch::backports.weakref-1.0.post1-py_1
  beautifulsoup4     pkgs/main/linux-64::beautifulsoup4-4.9.1-py38_0
  bitarray           pkgs/main/linux-64::bitarray-1.4.0-py38h7b6447c_0
  bkcharts           pkgs/main/linux-64::bkcharts-0.2-py38_0
  blas               pkgs/main/linux-64::blas-1.0-mkl
  bleach             pkgs/main/noarch::bleach-3.1.5-py_0
  blosc              pkgs/main/linux-64::blosc-1.19.0-hd408876_0
  bokeh              pkgs/main/linux-64::bokeh-2.1.1-py38_0
  boto               pkgs/main/linux-64::boto-2.49.0-py38_0
  bottleneck         pkgs/main/linux-64::bottleneck-1.3.2-py38heb32a55_1
  brotlipy           pkgs/main/linux-64::brotlipy-0.7.0-py38h7b6447c_1000
  bzip2              pkgs/main/linux-64::bzip2-1.0.8-h7b6447c_0
  ca-certificates    pkgs/main/linux-64::ca-certificates-2020.6.24-0
  cairo              pkgs/main/linux-64::cairo-1.14.12-h8948797_3
  certifi            pkgs/main/linux-64::certifi-2020.6.20-py38_0
  cffi               pkgs/main/linux-64::cffi-1.14.0-py38he30daa8_1
  chardet            pkgs/main/linux-64::chardet-3.0.4-py38_1003
  click              pkgs/main/noarch::click-7.1.2-py_0
  cloudpickle        pkgs/main/noarch::cloudpickle-1.5.0-py_0
  clyent             pkgs/main/linux-64::clyent-1.2.2-py38_1
  colorama           pkgs/main/noarch::colorama-0.4.3-py_0
  conda              pkgs/main/linux-64::conda-4.8.3-py38_0
  conda-build        pkgs/main/linux-64::conda-build-3.18.11-py38_0
  conda-env          pkgs/main/linux-64::conda-env-2.6.0-1
  conda-package-han~ pkgs/main/linux-64::conda-package-handling-1.6.1-py38h7b6447c_0
  conda-verify       pkgs/main/noarch::conda-verify-3.4.2-py_1
  contextlib2        pkgs/main/noarch::contextlib2-0.6.0.post1-py_0
  cryptography       pkgs/main/linux-64::cryptography-2.9.2-py38h1ba5d50_0
  curl               pkgs/main/linux-64::curl-7.71.1-hbc83047_1
  cycler             pkgs/main/linux-64::cycler-0.10.0-py38_0
  cython             pkgs/main/linux-64::cython-0.29.21-py38he6710b0_0
  cytoolz            pkgs/main/linux-64::cytoolz-0.10.1-py38h7b6447c_0
  dask               pkgs/main/noarch::dask-2.20.0-py_0
  dask-core          pkgs/main/noarch::dask-core-2.20.0-py_0
  dbus               pkgs/main/linux-64::dbus-1.13.16-hb2f20db_0
  decorator          pkgs/main/noarch::decorator-4.4.2-py_0
  defusedxml         pkgs/main/noarch::defusedxml-0.6.0-py_0
  diff-match-patch   pkgs/main/noarch::diff-match-patch-20200713-py_0
  distributed        pkgs/main/linux-64::distributed-2.20.0-py38_0
  docutils           pkgs/main/linux-64::docutils-0.16-py38_1
  entrypoints        pkgs/main/linux-64::entrypoints-0.3-py38_0
  et_xmlfile         pkgs/main/noarch::et_xmlfile-1.0.1-py_1001
  expat              pkgs/main/linux-64::expat-2.2.9-he6710b0_2
  fastcache          pkgs/main/linux-64::fastcache-1.1.0-py38h7b6447c_0
  filelock           pkgs/main/noarch::filelock-3.0.12-py_0
  flake8             pkgs/main/noarch::flake8-3.8.3-py_0
  flask              pkgs/main/noarch::flask-1.1.2-py_0
  fontconfig         pkgs/main/linux-64::fontconfig-2.13.0-h9420a91_0
  freetype           pkgs/main/linux-64::freetype-2.10.2-h5ab3b9f_0
  fribidi            pkgs/main/linux-64::fribidi-1.0.9-h7b6447c_0
  fsspec             pkgs/main/noarch::fsspec-0.7.4-py_0
  future             pkgs/main/linux-64::future-0.18.2-py38_1
  get_terminal_size  pkgs/main/linux-64::get_terminal_size-1.0.0-haa9412d_0
  gevent             pkgs/main/linux-64::gevent-20.6.2-py38h7b6447c_0
  glib               pkgs/main/linux-64::glib-2.65.0-h3eb4bd4_0
  glob2              pkgs/main/noarch::glob2-0.7-py_0
  gmp                pkgs/main/linux-64::gmp-6.1.2-h6c8ec71_1
  gmpy2              pkgs/main/linux-64::gmpy2-2.0.8-py38hd5f6e3b_3
  graphite2          pkgs/main/linux-64::graphite2-1.3.14-h23475e2_0
  greenlet           pkgs/main/linux-64::greenlet-0.4.16-py38h7b6447c_0
  gst-plugins-base   pkgs/main/linux-64::gst-plugins-base-1.14.0-hbbd80ab_1
  gstreamer          pkgs/main/linux-64::gstreamer-1.14.0-hb31296c_0
  h5py               pkgs/main/linux-64::h5py-2.10.0-py38h7918eee_0
  harfbuzz           pkgs/main/linux-64::harfbuzz-2.4.0-hca77d97_1
  hdf5               pkgs/main/linux-64::hdf5-1.10.4-hb1b8bf9_0
  heapdict           pkgs/main/noarch::heapdict-1.0.1-py_0
  html5lib           pkgs/main/noarch::html5lib-1.1-py_0
  icu                pkgs/main/linux-64::icu-58.2-he6710b0_3
  idna               pkgs/main/noarch::idna-2.10-py_0
  imageio            pkgs/main/noarch::imageio-2.9.0-py_0
  imagesize          pkgs/main/noarch::imagesize-1.2.0-py_0
  importlib-metadata pkgs/main/linux-64::importlib-metadata-1.7.0-py38_0
  importlib_metadata pkgs/main/noarch::importlib_metadata-1.7.0-0
  intel-openmp       pkgs/main/linux-64::intel-openmp-2020.1-217
  intervaltree       pkgs/main/noarch::intervaltree-3.0.2-py_1
  ipykernel          pkgs/main/linux-64::ipykernel-5.3.2-py38h5ca1d4c_0
  ipython            pkgs/main/linux-64::ipython-7.16.1-py38h5ca1d4c_0
  ipython_genutils   pkgs/main/linux-64::ipython_genutils-0.2.0-py38_0
  ipywidgets         pkgs/main/noarch::ipywidgets-7.5.1-py_0
  isort              pkgs/main/linux-64::isort-4.3.21-py38_0
  itsdangerous       pkgs/main/noarch::itsdangerous-1.1.0-py_0
  jbig               pkgs/main/linux-64::jbig-2.1-hdba287a_0
  jdcal              pkgs/main/noarch::jdcal-1.4.1-py_0
  jedi               pkgs/main/linux-64::jedi-0.17.1-py38_0
  jeepney            pkgs/main/noarch::jeepney-0.4.3-py_0
  jinja2             pkgs/main/noarch::jinja2-2.11.2-py_0
  joblib             pkgs/main/noarch::joblib-0.16.0-py_0
  jpeg               pkgs/main/linux-64::jpeg-9b-h024ee3a_2
  json5              pkgs/main/noarch::json5-0.9.5-py_0
  jsonschema         pkgs/main/linux-64::jsonschema-3.2.0-py38_0
  jupyter            pkgs/main/linux-64::jupyter-1.0.0-py38_7
  jupyter_client     pkgs/main/noarch::jupyter_client-6.1.6-py_0
  jupyter_console    pkgs/main/noarch::jupyter_console-6.1.0-py_0
  jupyter_core       pkgs/main/linux-64::jupyter_core-4.6.3-py38_0
  jupyterlab         pkgs/main/noarch::jupyterlab-2.1.5-py_0
  jupyterlab_server  pkgs/main/noarch::jupyterlab_server-1.2.0-py_0
  keyring            pkgs/main/linux-64::keyring-21.2.1-py38_0
  kiwisolver         pkgs/main/linux-64::kiwisolver-1.2.0-py38hfd86e86_0
  krb5               pkgs/main/linux-64::krb5-1.18.2-h173b8e3_0
  lazy-object-proxy  pkgs/main/linux-64::lazy-object-proxy-1.4.3-py38h7b6447c_0
  lcms2              pkgs/main/linux-64::lcms2-2.11-h396b838_0
  ld_impl_linux-64   pkgs/main/linux-64::ld_impl_linux-64-2.33.1-h53a641e_7
  libarchive         pkgs/main/linux-64::libarchive-3.4.2-h62408e4_0
  libcurl            pkgs/main/linux-64::libcurl-7.71.1-h20c2e04_1
  libedit            pkgs/main/linux-64::libedit-3.1.20191231-h14c3975_1
  libffi             pkgs/main/linux-64::libffi-3.3-he6710b0_2
  libgcc-ng          pkgs/main/linux-64::libgcc-ng-9.1.0-hdf63c60_0
  libgfortran-ng     pkgs/main/linux-64::libgfortran-ng-7.3.0-hdf63c60_0
  liblief            pkgs/main/linux-64::liblief-0.10.1-he6710b0_0
  libllvm9           pkgs/main/linux-64::libllvm9-9.0.1-h4a3c616_1
  libpng             pkgs/main/linux-64::libpng-1.6.37-hbc83047_0
  libsodium          pkgs/main/linux-64::libsodium-1.0.18-h7b6447c_0
  libspatialindex    pkgs/main/linux-64::libspatialindex-1.9.3-he6710b0_0
  libssh2            pkgs/main/linux-64::libssh2-1.9.0-h1ba5d50_1
  libstdcxx-ng       pkgs/main/linux-64::libstdcxx-ng-9.1.0-hdf63c60_0
  libtiff            pkgs/main/linux-64::libtiff-4.1.0-h2733197_1
  libtool            pkgs/main/linux-64::libtool-2.4.6-h7b6447c_5
  libuuid            pkgs/main/linux-64::libuuid-1.0.3-h1bed415_2
  libxcb             pkgs/main/linux-64::libxcb-1.14-h7b6447c_0
  libxml2            pkgs/main/linux-64::libxml2-2.9.10-he19cac6_1
  libxslt            pkgs/main/linux-64::libxslt-1.1.34-hc22bd24_0
  llvmlite           pkgs/main/linux-64::llvmlite-0.33.0-py38hc6ec683_1
  locket             pkgs/main/linux-64::locket-0.2.0-py38_1
  lxml               pkgs/main/linux-64::lxml-4.5.2-py38hefd8a0e_0
  lz4-c              pkgs/main/linux-64::lz4-c-1.9.2-he6710b0_0
  lzo                pkgs/main/linux-64::lzo-2.10-h7b6447c_2
  markupsafe         pkgs/main/linux-64::markupsafe-1.1.1-py38h7b6447c_0
  matplotlib         pkgs/main/linux-64::matplotlib-3.2.2-0
  matplotlib-base    pkgs/main/linux-64::matplotlib-base-3.2.2-py38hef1b27d_0
  mccabe             pkgs/main/linux-64::mccabe-0.6.1-py38_1
  mistune            pkgs/main/linux-64::mistune-0.8.4-py38h7b6447c_1000
  mkl                pkgs/main/linux-64::mkl-2020.1-217
  mkl-service        pkgs/main/linux-64::mkl-service-2.3.0-py38he904b0f_0
  mkl_fft            pkgs/main/linux-64::mkl_fft-1.1.0-py38h23d657b_0
  mkl_random         pkgs/main/linux-64::mkl_random-1.1.1-py38h0573a6f_0
  mock               pkgs/main/noarch::mock-4.0.2-py_0
  more-itertools     pkgs/main/noarch::more-itertools-8.4.0-py_0
  mpc                pkgs/main/linux-64::mpc-1.1.0-h10f8cd9_1
  mpfr               pkgs/main/linux-64::mpfr-4.0.2-hb69a4c5_1
  mpmath             pkgs/main/linux-64::mpmath-1.1.0-py38_0
  msgpack-python     pkgs/main/linux-64::msgpack-python-1.0.0-py38hfd86e86_1
  multipledispatch   pkgs/main/linux-64::multipledispatch-0.6.0-py38_0
  navigator-updater  pkgs/main/linux-64::navigator-updater-0.2.1-py38_0
  nbconvert          pkgs/main/linux-64::nbconvert-5.6.1-py38_0
  nbformat           pkgs/main/noarch::nbformat-5.0.7-py_0
  ncurses            pkgs/main/linux-64::ncurses-6.2-he6710b0_1
  networkx           pkgs/main/noarch::networkx-2.4-py_1
  nltk               pkgs/main/noarch::nltk-3.5-py_0
  nose               pkgs/main/linux-64::nose-1.3.7-py38_2
  notebook           pkgs/main/linux-64::notebook-6.0.3-py38_0
  numba              pkgs/main/linux-64::numba-0.50.1-py38h0573a6f_1
  numexpr            pkgs/main/linux-64::numexpr-2.7.1-py38h423224d_0
  numpy              pkgs/main/linux-64::numpy-1.18.5-py38ha1c710e_0
  numpy-base         pkgs/main/linux-64::numpy-base-1.18.5-py38hde5b4d6_0
  numpydoc           pkgs/main/noarch::numpydoc-1.1.0-py_0
  olefile            pkgs/main/noarch::olefile-0.46-py_0
  openpyxl           pkgs/main/noarch::openpyxl-3.0.4-py_0
  openssl            pkgs/main/linux-64::openssl-1.1.1g-h7b6447c_0
  packaging          pkgs/main/noarch::packaging-20.4-py_0
  pandas             pkgs/main/linux-64::pandas-1.0.5-py38h0573a6f_0
  pandoc             pkgs/main/linux-64::pandoc-2.10-0
  pandocfilters      pkgs/main/linux-64::pandocfilters-1.4.2-py38_1
  pango              pkgs/main/linux-64::pango-1.45.3-hd140c19_0
  parso              pkgs/main/noarch::parso-0.7.0-py_0
  partd              pkgs/main/noarch::partd-1.1.0-py_0
  patchelf           pkgs/main/linux-64::patchelf-0.11-he6710b0_0
  path               pkgs/main/linux-64::path-13.1.0-py38_0
  path.py            pkgs/main/noarch::path.py-12.4.0-0
  pathlib2           pkgs/main/linux-64::pathlib2-2.3.5-py38_0
  pathtools          pkgs/main/noarch::pathtools-0.1.2-py_1
  patsy              pkgs/main/linux-64::patsy-0.5.1-py38_0
  pcre               pkgs/main/linux-64::pcre-8.44-he6710b0_0
  pep8               pkgs/main/linux-64::pep8-1.7.1-py38_0
  pexpect            pkgs/main/linux-64::pexpect-4.8.0-py38_0
  pickleshare        pkgs/main/linux-64::pickleshare-0.7.5-py38_1000
  pillow             pkgs/main/linux-64::pillow-7.2.0-py38hb39fc2d_0
  pip                pkgs/main/linux-64::pip-20.1.1-py38_1
  pixman             pkgs/main/linux-64::pixman-0.40.0-h7b6447c_0
  pkginfo            pkgs/main/linux-64::pkginfo-1.5.0.1-py38_0
  pluggy             pkgs/main/linux-64::pluggy-0.13.1-py38_0
  ply                pkgs/main/linux-64::ply-3.11-py38_0
  prometheus_client  pkgs/main/noarch::prometheus_client-0.8.0-py_0
  prompt-toolkit     pkgs/main/noarch::prompt-toolkit-3.0.5-py_0
  prompt_toolkit     pkgs/main/noarch::prompt_toolkit-3.0.5-0
  psutil             pkgs/main/linux-64::psutil-5.7.0-py38h7b6447c_0
  ptyprocess         pkgs/main/linux-64::ptyprocess-0.6.0-py38_0
  py                 pkgs/main/noarch::py-1.9.0-py_0
  py-lief            pkgs/main/linux-64::py-lief-0.10.1-py38h403a769_0
  pycodestyle        pkgs/main/noarch::pycodestyle-2.6.0-py_0
  pycosat            pkgs/main/linux-64::pycosat-0.6.3-py38h7b6447c_1
  pycparser          pkgs/main/noarch::pycparser-2.20-py_2
  pycurl             pkgs/main/linux-64::pycurl-7.43.0.5-py38h1ba5d50_0
  pydocstyle         pkgs/main/noarch::pydocstyle-5.0.2-py_0
  pyflakes           pkgs/main/noarch::pyflakes-2.2.0-py_0
  pygments           pkgs/main/noarch::pygments-2.6.1-py_0
  pylint             pkgs/main/linux-64::pylint-2.5.3-py38_0
  pyodbc             pkgs/main/linux-64::pyodbc-4.0.30-py38he6710b0_0
  pyopenssl          pkgs/main/noarch::pyopenssl-19.1.0-py_1
  pyparsing          pkgs/main/noarch::pyparsing-2.4.7-py_0
  pyqt               pkgs/main/linux-64::pyqt-5.9.2-py38h05f1152_4
  pyrsistent         pkgs/main/linux-64::pyrsistent-0.16.0-py38h7b6447c_0
  pysocks            pkgs/main/linux-64::pysocks-1.7.1-py38_0
  pytables           pkgs/main/linux-64::pytables-3.6.1-py38h9fd0a39_0
  pytest             pkgs/main/linux-64::pytest-5.4.3-py38_0
  python             pkgs/main/linux-64::python-3.8.3-hcff3b4d_2
  python-dateutil    pkgs/main/noarch::python-dateutil-2.8.1-py_0
  python-jsonrpc-se~ pkgs/main/noarch::python-jsonrpc-server-0.3.4-py_1
  python-language-s~ pkgs/main/linux-64::python-language-server-0.34.1-py38_0
  python-libarchive~ pkgs/main/noarch::python-libarchive-c-2.9-py_0
  pytz               pkgs/main/noarch::pytz-2020.1-py_0
  pywavelets         pkgs/main/linux-64::pywavelets-1.1.1-py38h7b6447c_0
  pyxdg              pkgs/main/noarch::pyxdg-0.26-py_0
  pyyaml             pkgs/main/linux-64::pyyaml-5.3.1-py38h7b6447c_1
  pyzmq              pkgs/main/linux-64::pyzmq-19.0.1-py38he6710b0_1
  qdarkstyle         pkgs/main/noarch::qdarkstyle-2.8.1-py_0
  qt                 pkgs/main/linux-64::qt-5.9.7-h5867ecd_1
  qtawesome          pkgs/main/noarch::qtawesome-0.7.2-py_0
  qtconsole          pkgs/main/noarch::qtconsole-4.7.5-py_0
  qtpy               pkgs/main/noarch::qtpy-1.9.0-py_0
  readline           pkgs/main/linux-64::readline-8.0-h7b6447c_0
  regex              pkgs/main/linux-64::regex-2020.6.8-py38h7b6447c_0
  requests           pkgs/main/noarch::requests-2.24.0-py_0
  ripgrep            pkgs/main/linux-64::ripgrep-11.0.2-he32d670_0
  rope               pkgs/main/noarch::rope-0.17.0-py_0
  rtree              pkgs/main/linux-64::rtree-0.9.4-py38_1
  ruamel_yaml        pkgs/main/linux-64::ruamel_yaml-0.15.87-py38h7b6447c_1
  scikit-image       pkgs/main/linux-64::scikit-image-0.16.2-py38h0573a6f_0
  scikit-learn       pkgs/main/linux-64::scikit-learn-0.23.1-py38h423224d_0
  scipy              pkgs/main/linux-64::scipy-1.5.0-py38h0b6359f_0
  seaborn            pkgs/main/noarch::seaborn-0.10.1-py_0
  secretstorage      pkgs/main/linux-64::secretstorage-3.1.2-py38_0
  send2trash         pkgs/main/linux-64::send2trash-1.5.0-py38_0
  setuptools         pkgs/main/linux-64::setuptools-49.2.0-py38_0
  simplegeneric      pkgs/main/linux-64::simplegeneric-0.8.1-py38_2
  singledispatch     pkgs/main/linux-64::singledispatch-3.4.0.3-py38_0
  sip                pkgs/main/linux-64::sip-4.19.13-py38he6710b0_0
  six                pkgs/main/noarch::six-1.15.0-py_0
  snappy             pkgs/main/linux-64::snappy-1.1.8-he6710b0_0
  snowballstemmer    pkgs/main/noarch::snowballstemmer-2.0.0-py_0
  sortedcollections  pkgs/main/noarch::sortedcollections-1.2.1-py_0
  sortedcontainers   pkgs/main/noarch::sortedcontainers-2.2.2-py_0
  soupsieve          pkgs/main/noarch::soupsieve-2.0.1-py_0
  sphinx             pkgs/main/noarch::sphinx-3.1.2-py_0
  sphinxcontrib      pkgs/main/linux-64::sphinxcontrib-1.0-py38_1
  sphinxcontrib-app~ pkgs/main/noarch::sphinxcontrib-applehelp-1.0.2-py_0
  sphinxcontrib-dev~ pkgs/main/noarch::sphinxcontrib-devhelp-1.0.2-py_0
  sphinxcontrib-htm~ pkgs/main/noarch::sphinxcontrib-htmlhelp-1.0.3-py_0
  sphinxcontrib-jsm~ pkgs/main/noarch::sphinxcontrib-jsmath-1.0.1-py_0
  sphinxcontrib-qth~ pkgs/main/noarch::sphinxcontrib-qthelp-1.0.3-py_0
  sphinxcontrib-ser~ pkgs/main/noarch::sphinxcontrib-serializinghtml-1.1.4-py_0
  sphinxcontrib-web~ pkgs/main/noarch::sphinxcontrib-websupport-1.2.3-py_0
  spyder             pkgs/main/linux-64::spyder-4.1.4-py38_0
  spyder-kernels     pkgs/main/linux-64::spyder-kernels-1.9.2-py38_0
  sqlalchemy         pkgs/main/linux-64::sqlalchemy-1.3.18-py38h7b6447c_0
  sqlite             pkgs/main/linux-64::sqlite-3.32.3-h62c20be_0
  statsmodels        pkgs/main/linux-64::statsmodels-0.11.1-py38h7b6447c_0
  sympy              pkgs/main/linux-64::sympy-1.6.1-py38_0
  tbb                pkgs/main/linux-64::tbb-2020.0-hfd86e86_0
  tblib              pkgs/main/noarch::tblib-1.6.0-py_0
  terminado          pkgs/main/linux-64::terminado-0.8.3-py38_0
  testpath           pkgs/main/noarch::testpath-0.4.4-py_0
  threadpoolctl      pkgs/main/noarch::threadpoolctl-2.1.0-pyh5ca1d4c_0
  tk                 pkgs/main/linux-64::tk-8.6.10-hbc83047_0
  toml               pkgs/main/noarch::toml-0.10.1-py_0
  toolz              pkgs/main/noarch::toolz-0.10.0-py_0
  tornado            pkgs/main/linux-64::tornado-6.0.4-py38h7b6447c_1
  tqdm               pkgs/main/noarch::tqdm-4.47.0-py_0
  traitlets          pkgs/main/linux-64::traitlets-4.3.3-py38_0
  typing_extensions  pkgs/main/noarch::typing_extensions-3.7.4.2-py_0
  ujson              pkgs/main/linux-64::ujson-1.35-py38h7b6447c_0
  unicodecsv         pkgs/main/linux-64::unicodecsv-0.14.1-py38_0
  unixodbc           pkgs/main/linux-64::unixodbc-2.3.7-h14c3975_0
  urllib3            pkgs/main/noarch::urllib3-1.25.9-py_0
  watchdog           pkgs/main/linux-64::watchdog-0.10.3-py38_0
  wcwidth            pkgs/main/noarch::wcwidth-0.2.5-py_0
  webencodings       pkgs/main/linux-64::webencodings-0.5.1-py38_1
  werkzeug           pkgs/main/noarch::werkzeug-1.0.1-py_0
  wheel              pkgs/main/linux-64::wheel-0.34.2-py38_0
  widgetsnbextension pkgs/main/linux-64::widgetsnbextension-3.5.1-py38_0
  wrapt              pkgs/main/linux-64::wrapt-1.11.2-py38h7b6447c_0
  wurlitzer          pkgs/main/linux-64::wurlitzer-2.0.1-py38_0
  xlrd               pkgs/main/noarch::xlrd-1.2.0-py_0
  xlsxwriter         pkgs/main/noarch::xlsxwriter-1.2.9-py_0
  xlwt               pkgs/main/linux-64::xlwt-1.3.0-py38_0
  xmltodict          pkgs/main/noarch::xmltodict-0.12.0-py_0
  xz                 pkgs/main/linux-64::xz-5.2.5-h7b6447c_0
  yaml               pkgs/main/linux-64::yaml-0.2.5-h7b6447c_0
  yapf               pkgs/main/noarch::yapf-0.30.0-py_0
  zeromq             pkgs/main/linux-64::zeromq-4.3.2-he6710b0_2
  zict               pkgs/main/noarch::zict-2.0.0-py_0
  zipp               pkgs/main/noarch::zipp-3.1.0-py_0
  zlib               pkgs/main/linux-64::zlib-1.2.11-h7b6447c_3
  zope               pkgs/main/linux-64::zope-1.0-py38_1
  zope.event         pkgs/main/linux-64::zope.event-4.4-py38_0
  zope.interface     pkgs/main/linux-64::zope.interface-4.7.1-py38h7b6447c_0
  zstd               pkgs/main/linux-64::zstd-1.4.5-h0b5b093_0


Preparing transaction: done
Executing transaction: done
installation finished.
{% endhighlight %}

<p>설치가 완료되면 다음과 같이 아나콘다를 초기화(initialize)할지를 묻는다.</p>

{% highlight text %}
Do you wish the installer to initialize Anaconda3
by running conda init? [yes|no]
[no] >>>
{% endhighlight %}

<p>아나콘다를 설치한 후 실제로 사용하기 위해서는 새로운 쉘을 열 때마다 아나콘다 초기화 코드가 실행되어야 한다. 위의 물음에 "yes"를 입력하면 <code class="language-plaintext highlighter-rouge">$HOME/.bashrc</code>에 아나콘다 초기화 코드를 등록함으로서 쉘이 열릴때마다 자동으로 아나콘다 초기화 코드가 입력되게 할 수 있다. "yes"를 입력하자.</p>

{% highlight text %}
./Anaconda3-2020.07-Linux-x86_64.sh: 491: [[: not found
no change     /home/ubuntu/anaconda3/condabin/conda
no change     /home/ubuntu/anaconda3/bin/conda
no change     /home/ubuntu/anaconda3/bin/conda-env
no change     /home/ubuntu/anaconda3/bin/activate
no change     /home/ubuntu/anaconda3/bin/deactivate
no change     /home/ubuntu/anaconda3/etc/profile.d/conda.sh
no change     /home/ubuntu/anaconda3/etc/fish/conf.d/conda.fish
no change     /home/ubuntu/anaconda3/shell/condabin/Conda.psm1
no change     /home/ubuntu/anaconda3/shell/condabin/conda-hook.ps1
no change     /home/ubuntu/anaconda3/lib/python3.8/site-packages/xontrib/conda.xsh
no change     /home/ubuntu/anaconda3/etc/profile.d/conda.csh
modified      /home/ubuntu/.bashrc

==> For changes to take effect, close and re-open your current shell. <==

If you'd prefer that conda's base environment not be activated on startup, 
   set the auto_activate_base parameter to false: 

conda config --set auto_activate_base false

Thank you for installing Anaconda3!

===========================================================================

Working with Python and Jupyter notebooks is a breeze with PyCharm
Professional! Code completion, Notebook debugger, VCS support, SSH, Docker,
Databases, and more!

Get a free trial at: https://www.anaconda.com/pycharm
{% endhighlight %}

<p>그럼 다음과 같은 문구가 뜨며 설치가 완료된다. 이제 현재 사용중인 쉘을 닫았다가 다시 열자. 정상적으로 설치되었다면 다음과 같이 쉘 프롬프트(Prompt) 앞에 <code class="language-plaintext highlighter-rouge">(base)</code>라는 것이 생겼을 것이다(쉘 프롬프트는 당연히 사용자 컴퓨터마다 조금씩 다를 것이다).</p>

{% highlight bash %}
(base) ubuntu@ubuntu-VirtualBox:~$ 
{% endhighlight %}

<p>이는 현재 <code class="language-plaintext highlighter-rouge">base</code> 가상환경이 활성화되어있음을 알려주는 것이다. <code class="language-plaintext highlighter-rouge">base</code> 가상환경은 아나콘다 설치 시 자동으로 만들어지는 가상환경으로, 아나콘다 기본 가상환경이다. <code class="language-plaintext highlighter-rouge">base</code> 가상환경 상태에서 파이썬 인터프리터의 경로를 출력해보면 다음과 같이 나온다.</p>

{% highlight bash %}
(base) ubuntu@ubuntu-VirtualBox:~$ which python  # /home/ubuntu/anaconda3/bin/python
{% endhighlight %}

<p>이대로 사용하여도 문제는 없지만, 익숙하지 않은 쉘 프롬프트에 스트레스를 받는다면 다음 명령어를 입력하여 자동으로 <code class="language-plaintext highlighter-rouge">base</code> 가상환경이 활성화되는 것을 막을 수 있다.</p>

{% highlight bash %}
(base) ubuntu@ubuntu-VirtualBox:~$ conda config --set auto_activate_base false
{% endhighlight %}

<p>쉘을 종료했다 다시 켜면 <code class="language-plaintext highlighter-rouge">(base)</code>가 없어진 것을 확인할 수 있다. 이 상태에서 파이썬 인터프리터의 경로를 출력해 보면 시스템에 설치된 기본 파이썬 인터프리터의 경로가 출력되는 것을 확인할 수 있다.</p>

{% highlight bash %}
ubuntu@ubuntu-VirtualBox:~$ which python  # (아무것도 출력되지 않음)
ubuntu@ubuntu-VirtualBox:~$ which python3  # /usr/bin/python3
{% endhighlight %}

</div>

<style>
div.collapsable > p.collapsable-btn {
    text-align: center;
    cursor: pointer;
    color: #0275d8;
}

div.collapsable > p.collapsable-btn:hover {
    text-decoration: underline;
}

div.collapsable > div.content {
    background-color: #fafafa;
    border-radius: 10px;
    padding: 1em;
}
</style>
<script>
$(document).ready(function() {
    $("div.collapsable > div.content").hide();
})

$("div.collapsable > p.collapsable-btn").click(function() {
    $(this).siblings("div.content").toggle();
})
</script>
</div>

## 아나콘다 삭제하기

아나콘다를 재설치하거나 아나콘다를 더이상 사용하지 않을 때는 아나콘다를 삭제해야 한다. 아나콘다 삭제는 두 가지 종류가 있다.

- Option A 삭제 : 단순삭제(Simple Remove). 단순히 아나콘다를 삭제만 한다. 이 경우 몇몇 파일들은 시스템에 남지만, 시스템에 거의 아무런 영향을 끼치지 않는다. 대부분의 경우 Option A 삭제만 해도 충분하다.
- Option B 삭제 : 완전삭제(Full Uninstall). 아나콘다 관련 모든 설정 파일, 디렉토리 일체를 모두 지우고 싶다면 Option B 삭제를 한다.

### Option A 삭제

만약 활성화되어 있는 가상환경이 있다면 비활성화한다. 이후 아나콘다 디렉토리가 있는 디렉토리로 가[^4] 다음 명렁어를 실행한다.

[^4]: 리눅스 기준, 설치 시 별다른 옵션을 지정하지 않았다면 `$HOME`

{% highlight bash %}
$ rm -rf anaconda3
{% endhighlight %}

이후 `.bash_profile`, `.bashrc` 등의 파일에서 아나콘다 관련 코드(ex. `export PATH="$HOME/anaconda3/bin:$PATH"`)를 모두 원래 상태로 만든다.

### Option B 삭제

`base` 가상환경을 활성화한다. 이후 다음 명령어로 Anaconda-Clean 패키지를 설치한다.

{% highlight bash %}
$ conda install anaconda-clean
{% endhighlight %}

설치가 완료되면 Anaconda-Clean을 실행한다. 뒤의 `--yes` 옵션을 붙이지 않으면 삭제하는 파일마다 삭제 확인(confirmation)을 받는다.

{% highlight bash %}
$ anaconda-clean --yes
{% endhighlight %}

Anaconda-Clean의 실행이 완료되면 [Optiona A 삭제](#kramdown_option-a-삭제)를 진행한다.


# 아나콘다 사용하기

## 가상환경 생성하기

아나콘다에서 가상환경은 다음과 같이 생성할 수 있다.

{% highlight bash %}
$ conda create -n <venv_name> python=<python_ver>
{% endhighlight %}

- `<venv_name>` : 가상환경의 이름. 가상환경의 이름은 고유해야 한다.[^5] 가상환경의 이름으로 '/', ' ', ':', '#' 문자를 사용할 수 없다.
- `<python_ver>` : 가상환경의 파이썬 인터프리터 버전. "3.7", "3.8" 등으로 파이썬 인터프리터 버전을 지정하면 된다.[^6][^7]

[^5]: 만약 기존에 존재하는 가상환경의 이름을 사용하게 되면 기존 가상환경을 제거하고 다시 새로운 가상환경을 만들지를 물어본다.
[^6]: 파이썬 2도 사용할 수 있다. 다만 파이썬 2는 2020년 1월 1일부로 지원이 종료되었으므로 되도록이면 사용을 자제하자.
[^7]: 파이썬 인터프리터 버전을 지정하지 않고도 가상환경을 만들 수 있긴 하다.(ex. `conda create -n "test"`) 이렇게 하면 시스템에 글로벌하게 설치된 파이썬이 덮어씌워지지(override) 않아 가상환경에서 파이썬을 사용해도 (가상환경의 파이썬이 아닌) 시스템의 파이썬이 사용된다. 이 상황에서 pip로 패키지를 설치하면 가상환경에 설치되는 것이 아니라 시스템에 글로벌하게 설치되어 의도치 않은 버전 문제 등이 발생할 수 있다.

ex)
{% highlight bash %}
$ conda create -n test1 python=3.7
$ conda create -n test2 python=3.8
{% endhighlight %}

## 가상환경 확인하기

생성한 가상환경의 목록은 다음 명령어 중 하나로 확인할 수 있다(어떤 걸 사용해도 결과는 같다).

{% highlight bash %}
$ conda env list
$ conda info --envs
{% endhighlight %}

가상환경을 생성하면 아나콘다가 설치된 디렉토리[^8] 밑의 `envs/` 디렉토리에 가상환경 폴더가 생성되므로, 이 디렉토리의 폴더 목록을 확인해도 생성된 가상환경들의 목록을 볼 수 있다.

[^8]: 리눅스 기준, 설치 시 별다른 옵션을 지정하지 않았다면 `$HOME/anaconda3/`

## 가상환경 삭제하기

생성한 가상환경은 다음 명령어 중 하나로 삭제할 수 있다(어떤 걸 사용해도 결과는 같다).

{% highlight bash %}
$ conda env remove -n <venv_name>
$ conda remove -n <venv_name> --all
{% endhighlight %}

- `<venv_name>` : 가상환경의 이름. 존재하지 않는 가상환경의 이름을 입력하면 아무런 일도 발생하지 않는다(아무런 가상환경도 삭제되지 않는다). 현재 활성화되어있는 가상환경을 지우면 오류 메시지가 출력되고 가상환경이 삭제되지 않는다.[^9]

[^9]: `conda deactivate` 명령어로 가상환경을 비활성화한 후 삭제해야 한다.

ex)
{% highlight bash %}
$ conda env remove -n test1
$ conda remove -n test2 --all
{% endhighlight %}

## 가상환경 활성화하기

가상환경은 다음 명령어로 활성화(activate)할 수 있다.

{% highlight bash %}
$ conda activate <venv_name>
{% endhighlight %}

- `<venv_name>` : 가상환경의 이름. 존재하지 않는 가상환경의 이름을 입력하면 오류 메시지를 출력한다.

ex)
{% highlight bash %}
$ conda activate test1
$ conda activate test2
{% endhighlight %}

가상환경이 활성화되면 쉘 프롬프트 앞에 괄호(`()`)로 현재 활성화되어 있는 가상환경이 나타난다.

ex)
{% highlight bash %}
(test1) ubuntu@ubuntu-VirtualBox:~$
{% endhighlight %}

이 상태에서 `which` 명령어로 파이썬 인터프리터의 경로를 출력해 보면 시스템에 설치된 파이썬 인터프리터의 경로가 아닌, 가상환경 디렉토리 밑에 있는 파이썬 인터프리터 경로로 덮어씌워져(override) 있는 것을 확인할 수 있다.

{% highlight bash %}
$ which python
{% endhighlight %}

다음 코드는 파이썬 쉘(REPL)에서 현재 파이썬 인터프리터의 위치와 site-packages 디렉토리의 위치를 확인하는 코드이다. 이 방법을 통해서도 가상환경이 활성화되면 파이썬 인터프리터와 site-packages가 가상환경의 것으로 덮어씌워져 있음을 확인할 수 있다.

{% highlight python %}
>>> import sys; sys.executable  # 파이썬 인터프리터 위치 출력
>>> import site; site.getsitepackages()  # site-packages 위치 출력
{% endhighlight %}

## 가상환경 비활성화하기

다음 명령어로 현재 활성화되어 있는 가상환경을 비활성화(deactivate)할 수 있다. 아무런 가상환경도 활성화되어 있지 않다면 아무 일도 일어나지 않는다.

{% highlight bash %}
$ conda deactivate
{% endhighlight %}

활성화할 때는 `<venv_name>`을 요구했지만, 비활성화할 때는 요구하지 않는다.

## 패키지 설치하기

아나콘다는 pip과 같은 패키지 관리자(Package Manager)이기도 하다. 가상환경이 활성화되어 있는 상태에서 다음 명령어를 입력하면 해당 가상환경에 패키지를 설치할 수 있다.

{% highlight bash %}
$ conda install <package_name>
{% endhighlight %}

- `<package_name>` : 패키지명

ex)
{% highlight bash %}
$ conda install numpy
$ conda install matplotlib
{% endhighlight %}

아나콘다와 pip은 거의 동일한 역할을 한다. 다만 경우에 따라 아나콘다로 설치했을 땐 이상하게 작동하는 패키지가 pip으로 설치했을 때는 잘 작동하거나, 그 반대의 경우도 일어난다. 만약 한 패키지 관리자로 설치했을 때 오류가 발생한다면 다른 패키지 관리자를 사용해 보자.

## 패키지 확인하기

가상환경이 활성화되어 있는 상태에서 다음 명령어를 입력하면 현재 가상환경에 설치된 (아나콘다가 인식 가능한) 모든 패키지들을 확인할 수 있다.

{% highlight bash %}
$ conda list
{% endhighlight %}

만약 어떤 패키지가 pip과 아나콘다 둘 다 배포되어(deploy) 있으면, 해당 패키지는 아나콘다로 설치했어도 pip에서 확인할 수도 있고(`pip list`), 반대로 pip에서 설치했어도 아나콘다에서 확인할 수 있다.

## 패키지 삭제하기

가상환경이 활성화되어 있는 상태에서 다음 명령어를 입력하면 설치된 패키지를 제거할 수 있다. 만약 설치되어 있지 않은 패키지를 삭제하려 하면 오류 메시지가 출력된다.

{% highlight bash %}
$ conda remove <package_name>
{% endhighlight %}

- `<package_name>` : 패키지명

ex)
{% highlight bash %}
$ conda remove numpy
$ conda remove matplotlib
{% endhighlight %}
