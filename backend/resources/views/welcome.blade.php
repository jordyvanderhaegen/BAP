<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{mix('css/app.css')}}">
    </head>
    <body>
        <div id="app">
            <app>
                <map-component></map-component>
                <map-overlay-component>
                        {{-- <timeline-component></timeline-component> --}}
                        <event-detail-component></event-detail-component>
                </map-overlay-component>
            </app>
        </div>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
