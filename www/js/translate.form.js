(function () {
  'use strict';
  angular
    .module('translate.form', ['ionic'])
    .config(function ($translateProvider) {
      $translateProvider
        .translations('en_US', {
          TITLE: 'Title',
          GEOLOCATION: 'Geolocation',
          ADDCOMMENT: 'Add comment',
          FORGOT_PASS: 'Forgot your password?',
          NAME: 'Name',
          PASSWORD: 'Password',
          EMAIL: 'Email',
          BIRTHDAY: 'Birthday',
          STATUS: 'Status',
          GENDER: 'Gender',
          MAN: 'Man',
          WOMAN: 'Woman',
          SITE: 'Site',
          TELEPHONE: 'Telephone',
          COMMENT: 'Comment',
          SUBJECT: 'Subject',
          ADDRESS: 'Address',
          BUG: 'Bug',
          SUGGESTION: 'Suggestion',
          COMPLAINT: 'Complaint',
        });

      $translateProvider
        .translations('pt_BR', {
          TITLE: 'Título',
          COMMENT: 'Comentário',
          SUBJECT: 'Assunto',
          GEOLOCATION: 'Geolocalização',
          ADDCOMMENT: 'Escreva seu comentário',
          EMAIL: 'Email',
          PASSWORD: 'Senha',
          FORGOT_PASS: 'Esqueceu sua senha?',
          NAME: 'Nome',
          BIRTHDAY: 'Data de Nascimento',
          STATUS: 'Status',
          GENDER: 'Gênero',
          MAN: 'Homem',
          WOMAN: 'Mulher',
          SITE: 'Site',
          TELEPHONE: 'Telefone',
          ADDRESS: 'Endereço',
          BUG: 'Erro',
          SUGGESTION: 'Sugestão',
          COMPLAINT: 'Denúncia',
        });

      var LangVar = navigator.language || navigator.userLanguage;
      var userLangVar = LangVar.substring(0, 2) + '_' + LangVar.substring(3, 5)
        .toUpperCase();
      $translateProvider.preferredLanguage(userLangVar);
      // Enable escaping of HTML
      $translateProvider.useSanitizeValueStrategy('escaped');
    });
})();
