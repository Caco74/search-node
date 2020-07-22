$(document).ready(function() {
    //Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
  })

  init()
  setSearch()

  $('#buscar').click(function() {
    if($('#checkPersonalizada')[0].checked) {
      if( $('#checkPersonalizada').is(':checked') ) {
        alert('Seleccionado');
      }
      
      var valores = $('#rangoPrecio').val()
      console.log(`Los valores en checkPersonalizada son: ${valores}`);
      console.log(`ciudad ${$("#ciudad").val()}`);
      valores = valores.split(';')

      if($("#ciudad").val() === '' && $('#tipo').val() != '') {
        console.log('ciudad GET');
        var urls = `https://caco74.github.io/search-node/ciudad/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
      } 
      else if ($('#tipo').val() === '' && $("#ciudad").val() != '') {
        console.log('tipo GET');
        var urls = `https://caco74.github.io/search-node/ciudad/${$("#ciudad").val()}/tipo/desde/${valores[0]}/hasta/${valores[1]}`;
      } 
      else if ($("#ciudad").val() === '' && $('#tipo').val() === '') {
        console.log('todo GET');
        var urls = `https://caco74.github.io/search-node/ciudad/tipo/desde/${valores[0]}/hasta/${valores[1]}`;
      }
      else {
        console.log('Error!');
      }
      
    } else {
      var urls = 'https://caco74.github.io/search-node/search'
    }
    $.ajax({
      url: urls,
      type: 'get',
      dataType: 'json'
    })
      .done(function(info) {
        if(!info.error) {
          console.log(info);
          $('.lista').html(renderCard(info.datos));
        }
      })
  })

  function renderSelect(info) { 
    var html = '';
    info.forEach(function(key, idx) {
        html += `<option value="${key}">${key}</option>`;
    });
    return html;
  }

  function renderCard(objArr) {
      var html = '';
      
      objArr.forEach(function(key, idx)
      {
          html += `<div class="card horizontal">
                  <div class="card-image">
                      <img src="https://caco74.github.io/search-node/public/img/home.jpg">
                  </div>
                  <div class="card-stacked">
                      <div class="card-content">
                          <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                          <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                          <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                          <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                          <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                          <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
                      </div>
                  </div>
              </div>`;
      });
      return html;
  } 

  function init(){
      $.ajax({
          url: 'https://caco74.github.io/search-node/filteroptions',
          type: 'get',
          dataType: 'json'
      })
      .done(function(info) {
          if (!info.error) {
              console.log(info);
              $('#ciudad').append(renderSelect(info.ciudades));
              $('#tipo').append(renderSelect(info.tipos));
              $("#ciudad").material_select();
              $("#tipo").material_select();
          }
      });
  } 

  function setSearch() {
      let busqueda = $('#checkPersonalizada');
      busqueda.on('change', (e) => {
          this.customSearch = !this.customSearch;
          $('#personalizada').toggleClass('invisible');
      });
  }

})
