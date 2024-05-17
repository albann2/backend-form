function save(){
    var poste=document.getElementById("poste").value
    var nom=document.getElementById("nom").value
    var agenda=document.getElementById("agenda").value
    var email=document.getElementById("eamil").value
    var telephone=document.getElementById("telephone").value
    var donnees={
        poste:poste,
        nom:nom,
        agenda:agenda,
        email:email,
        telephone:telephone
    }
    var xhr=new XMLHttpRequest()
    xhr.open('POST','/Postadministration',true)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4 && xhr.status===200){
            console.log(xhr.responseText)
            location.reload();
        }
    }
    xhr.send(JSON.stringify(donnees))
}