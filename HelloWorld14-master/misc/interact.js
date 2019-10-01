
document.getElementById('switch').addEventListener('change', interact);


function interact(){
    
    status = document.getElementById('switch').value;
    console.log(status);

    if(status == "true"){
        console.log("active");
        var disabled = document.createAttribute('disabled');
        document.getElementById('slider').setAttributeNode(disabled);
       
        //document.getElementById('slider').attributeChangedCallback();
        
    }
    else{ //disable the slider
        console.log('inactive');
        document.getElementById('slider').removeAttribute('disabled');
    }
}