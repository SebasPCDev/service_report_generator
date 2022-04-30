'use strict'


var file;
var evento1 = document.querySelector("#archivoexcel");
console.log(window); //este console me permite ver las cosas que posee la ventana. En este caso, me muestra el XLSX ya que se importó
                    //por medio de un script
evento1.addEventListener("change", (event)=>{
    file = event.target.files[0];

});

//console.log();
var rowObject;
document.querySelector("#cargaExcel").addEventListener("click", ()=>{
    if(file){
        console.log("hi");
        let fileReader = new FileReader(); //FileReader es una clase para leer archivos y retorna un objeto
        fileReader.readAsBinaryString(file); 
        fileReader.onload = (event) => {
            var data = event.target.result;
            var workbook = XLSX.read(data, {  //esta funcion lee el objeto xlsx que está en binario y retorna un objeto con direfentes cosas.
                type: "binary"
            });
        workbook.SheetNames.forEach(sheet => {
            rowObject = XLSX.utils.sheet_to_row_object_array(
                workbook.Sheets[sheet]
            );
            let jsonObject = JSON.stringify(rowObject);
            //document.querySelector("#jsonData").innerHTML = jsonObject;
                
         }); 
            console.log(rowObject);
    };
        
        

        /*Para que fileReader.onload se ejecute, debe haberse leido el contenido del file
        ya sea con readAsArrayBuffer, reasAsBinaryString entre otros... de lo contrario, 
        la funcion no se ejecuta.*/
        
    }
});
