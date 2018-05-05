echo "script 2 started:"
cd ..
cd clients

var1 = clients
if [[ $3 == *"$var1"* ]]; then
    cp -a erp-module-clients/. $1/
    rm -r erp-module-clients
fi
var2 = financial
if [[ $3 == *"var2"* ]]; then
    cp -a erp-module-financial/. $1/
    rm -r erp-module-financial
fi

cd $1
npm update
cd routes
rm .DS_Store
cd ..
cd views

menu="<% include base.ejs %>

<head>

  <link rel=\"stylesheet\" type=\"text/css\" href=\"/stylesheets/base_logged.css\">
  <link rel=\"stylesheet\" type=\"text/css\" href=\"/stylesheets/mui.min.css\">
  <script src=\"/javascripts/side_menu.js\"></script>
  <meta charset=\"utf-8\">
  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
</head>

<body>
<div id=\"sidedrawer\" class=\"mui--no-user-select\">
  <div id=\"sidedrawer-brand\" class=\"mui--appbar-line-height\">
    <div id=\"logo\" class=\"margin-bottom\"></div>
  </div>
  <div class=\"mui-divider\"></div>
  <ul>
    <li>
      <a href=\"#\"><strong>Ínicio</strong></a>
    </li>
<!--menu-->
  </ul>
</div>

<header id=\"header\">
  <div class=\"mui-appbar mui--appbar-line-height\">
    <div class=\"mui-container-fluid\">
      <a class=\"sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block js-show-sidedrawer\">☰</a>
      <a class=\"sidedrawer-toggle mui--hidden-xs mui--hidden-sm js-hide-sidedrawer\">☰</a>
      <a class=\"sidedrawer-toggle\">Test</a>
  </div>
</header>"
find="<!--menu-->"
result=${menu//$find/$2}
echo $result >> base_logged.ejs
echo "finished."