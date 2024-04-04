---
title: "nmcli에 네트워크 인터페이스들이 unmanaged로 뜨는 문제 해결"
date_created: "2021-12-17"
date_modified: "2021-12-18"
tags: ["nmcli", "ubuntu", "ubuntu20.04"]
---

# 문제상황

`nmcli`는 NetworkManager를 제어하는 command-line 명령어로, 네트워크 인터페이스의 상태 등을 볼 때 사용할 수 있다...고 한다. 하지만 Ubuntu 20.04 LTS Server 기준, nmcli 명령어를 실행하면 다음과 같이 아무 것도 뜨지 않는다.[^1]

[^1]: Wi-Fi 장치가 있다면 그 장치는 뜰 것이나, ethernet 장치는 아무것도 뜨지 않는다.

{:.code-header}
nmcli : 현재 활성화된 연결 표시

{% highlight bash %}
nmcli connection show
{% endhighlight %}

{:.code-result}
{% highlight text %}
(아무 것도 뜨지 않음)
{% endhighlight %}

# 해결법

이는 NetworkManager 기본 설정이 (이해할 수 없게도) 네트워크 인터페이스들을 관리하지 않도록 되어 있어 그런 것이다. 즉 NetworkManager 설정에서 네트워크 인터페이스들을 관리하도록 설정해 주면 문제를 해결할 수 있다.

NetworkManager의 설정 파일은 Ubuntu 20.04 LTS Server 기준, `/usr/lib/NetworkManager/conf.d/` 디렉토리에서 찾을 수 있다. 이 디렉토리 안에 있는 `10-globally-managed-devices.conf` 파일은 다음과 같이 작성되어 있다.

{:.code-header}
/usr/lib/NetworkManager/conf.d/10-globally-managed-devices.conf

{% highlight text %}
[keyfile]
unmanaged-devices=*,except:type:wifi,except:type:gsm,except:type:cdma
{% endhighlight %}

딱 보면 알겠지만, `type`이 `wifi`, `gsm`, `cdma`인 장치를 제외한 모든 장치(`*`)를 unmanaged하도록 설정되어 있다. 이 설정에 의해 ethernet 등의 네트워크 인터페이스들이 모두 unmanaged되어 nmcli 명령어로 아무런 결과가 뜨지 않은 것이다. 따라서 이 파일을 다음과 같이 수정하자.

{:.code-header}
/usr/lib/NetworkManager/conf.d/10-globally-managed-devices.conf (수정됨)

{% highlight text %}
[keyfile]
unmanaged-devices=*,except:type:wifi,except:type:gsm,except:type:cdma,except:type:ethernet
{% endhighlight %}

이렇게 한 후 NetworkManager 서비스를 재시작하면 문제가 해결된다.

{:.code-header}
NetworkManager 서비스 재시작

{% highlight bash %}
sudo systemctl restart NetworkManager
{% endhighlight %}