'use strict'


var file;
var evento1 = document.querySelector("#archivoexcel");

evento1.addEventListener("change", (event)=>{
    file = event.target.files[0];
    console.log(file);

});

//console.log();
document.querySelector("#cargaExcel").addEventListener("click", ()=>{
    if(file){
        console.log("hi");
        var fileReader = new FileReader();
        //console.log(fileReader);
        console.log('Estoy despues del filereader');
        fileReader.onload = function(event){
            var data = event.target.result;
            console.log(event.target.result);
            var workbook = XLSX.read(data, {
                type: "binary"
            });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets[sheet]
                );
                let jsonObject = JSON.stringify(rowObject);
                document.getElementById("jsonData").innerHTML = jsonObject;
                //console.log(jsonObject);
            });
        };
        fileReader.readAsBinaryString(file);

        /*Para que fileReader.onload se ejecute, debe haberse leido el contenido del file
        ya sea con readAsArrayBuffer, reasAsBinaryString entre otros... de lo contrario, 
        la funcion no se ejecuta.*/
        
    }
});
