# Tsinghua Course Registration Website

## Used Technologies

Using the Chrome plugin **Wapplyzer** I returned the following technologies:
- Prototype 1.4.0
- jQuery 1.7.1
- CKEditor
- Bootstrap
- Java

That is a bit underwhelming.

## Viewing the page source

Legacy code like the following with surprisingly funny Chinese comments:
```javascript
//处理左侧树的点击事件
function hitTree(code,txt,deep,isleaf,url,target){
    var URL =url;
    if(URL=="") return;
    if(target!=""){
    	window.open(URL,target);
    }else{
    	right.location.href = URL;
    }
}

//显示左侧树
function showTree(code){
    var u = "xkJxs.vxkJxsXkbBs.do?m=showTree&p_xnxq=2023-2024-2&showtitle=0&jxs_xkjd=退课";
    if(code) u += "&defaultCode=" + code;
    tree.location.href = u;
}
//初始化函数
function init(){
  window.document.title = "Visiting student course registration";
  var hreftmp="";
  
  	  hreftmp="/xkJxs.vxkJxsJxjhBs.do?m=jxsKkxxSearch&p_xnxq=2023-2024-2&showtitle=0";
    
  if(hreftmp==""){
  	hreftmp="zhjw.do?m=showError&zhjwErrMsg=You do not have permission to access this page";
  }
  showTree();
  initTopLocal();
  right.location.href =hreftmp;
}
Event.observe(window, "load", init, false);
```

Additionally, the main webpage is just a table. The insides of the columns are iframes which load the above defined URLs. Absolutely horrendous.

```html
<tr>
    <td width="23%" id="lefttd"><iframe name='tree' align="left"   width="100%" src=""  height="100%" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" border=0></iframe></td>
    <td align="center"class="suojintiao">
       <img id=menu  onclick="expand('23%','76%')" border=0 height=60 name=menutop src="images/zhjw/tree/menu_in.gif" width=8>
	</td>
    <td id="righttd"><iframe name='right' align="right"  width="100%" src="" height="100%" scrolling="auto"  marginheight="0" marginwidth="0" frameborder="0"  border=0></iframe></td>
  </tr>
```


## Finding out the IP address
`https://www.nslookup.io/domains/zhjwe.cic.tsinghua.edu.cn/webservers/`

Returns the IP address `166.111.4.79` hosted by the **China Education and Research Network Center**.

## 500 server error
When calling the URL `https://zhjwe.cic.tsinghua.edu.cn//xkJxs.vxkJxsJxjhBs.do?` together with the query options it returns a 500 server. The strange thing is that it does not happen when I actually clicked on the 5th page on the real website. That means it will only resolve if the `a` tag with the `href="javascript:turn(5)"` has been clicked.

By looking at the page [source](view-source:https://zhjwe.cic.tsinghua.edu.cn//xkJxs.vxkJxsJxjhBs.do) you can find the following definition:
```javascript
function turn(p){//翻页函数
  document.frm.page.value = p;
  if(confirmSubmited(document.frm)){
    document.frm.submit();
  }
}
```

This `frm` is defined to be a form element. Don't you also love the typo *submited*?
This function is defined in the file `https://zhjwe.cic.tsinghua.edu.cn//scripts/gbp/page.js`.

```javascript
function confirmSubmited(frm){
  
  if(!FRM_SUBMITED){
    FRM_SUBMITED = true;
    //为了视觉效果，将表单内所有的按钮置为不可用    
    if(frm){   
      var eles = frm.elements;
      for(var i=0; i < eles.length; i++) {    
        obj= eles.item(i);
        type=obj.type;
        if((type == "button" || type == "submit" || type == "reset") && obj.disabled == false){        
          obj.disabled = true;
        }
      }
    }     
    return true;
  }
  return false;
}
```

This function was non-essential. The main problem was that I embedded the query within the URL like in a GET request even though the form clearly embedded it in the request body of a POST request.
The next problem was that calling the function returned a different response than doing it within the browser. After comparing the request headers I found out that the content-type was the main culprit.

```python
"Content-Type": "application/x-www-form-urlencoded",
```

## Nmap enumeration
`nmap 166.111.4.79`
```
Starting Nmap 7.95 ( https://nmap.org ) at 2024-05-10 21:46 CST
Nmap scan report for 166.111.4.79
Host is up (0.025s latency).
Not shown: 994 closed tcp ports (conn-refused)
PORT     STATE    SERVICE
53/tcp   open     domain
80/tcp   open     http
139/tcp  filtered netbios-ssn
443/tcp  open     https
445/tcp  filtered microsoft-ds
8009/tcp filtered ajp13

Nmap done: 1 IP address (1 host up) scanned in 5.42 seconds
```
Exposed port 8009 making use of the Apache JServ Protocol.
It means that the server uses Apache Tomcat with a high probability.

## Ghostcat vulnerability (CVE-2020-1938 Detail)
Has a vulnerability of 9.8 (critical). The condition is that it muse have the following versions: 9.0.0.M1 to 9.0.0.30, 8.5.0 to 8.5.50 and 7.0.0 to 7.0.99.

Running the following command downloaded from the webpage [Chaitin](https://www.chaitin.cn/en/ghostcat#download) reveals that the server could also be vulnerable to another attack
```shell
./xray_darwin_arm64 servicescan --target 166.111.4.79:8009
```

Service Scan Support:
- Tomcat AJP Potential RCE (CVE-2020-1938)
- Weblogic RCE (CVE-2023-21839/21931/21979)

A check using Metasploit showed that the target is not exploitable.
