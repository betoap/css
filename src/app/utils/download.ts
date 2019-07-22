export class Download {

  public static download( name: string, data, newTab: boolean = true ) {

        const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

        let uri = data;

        if ( base64regex.test( data ) ) {
            uri = Download.downloadBase64( data );
        }

        const body = document.body;
        const element = document.createElement('a'); // Cria o link

        element.download = name; // Define o nome
        element.href = uri; // Define a url
        element.className = 'hide-link'; // Adiciona uma classe css pra ocultar
        element.style.display = 'none';

        // Força abrir em uma nova janela
        if (newTab) {
            element.target = '_blank';
        }

        // Adiciona no corpo da página (necessário para evitar comportamento constiado em diferentes navegadores)
        body.appendChild(element);
        if ( element.hasOwnProperty('fireEvent') ) {
            // Simula o click pra navegadores com suporte ao fireEvent
            element['fireEvent']('onclick');
        } else {
            // Simula o click com MouseEvents
            const evObj = document.createEvent('MouseEvents');
            evObj.initEvent('click', true, false);
            element.dispatchEvent(evObj);
        }

        // Remove o link da página
        setTimeout(function() {
            body.removeChild(element);
        }, 100);
    }

    private static downloadBase64 ( data ) {
        // Internet Explorer
        if (navigator.msSaveBlob) {
            const blob = new Blob( [data] ); // Aplica o conteúdo para baixar
            navigator.msSaveBlob( blob, name ); // Nome do arquivo
            return;
        }
        return `data:application/octecstream,${encodeURIComponent( data )}`;
    }
}
