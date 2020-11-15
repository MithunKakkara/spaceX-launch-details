// html skeleton provider
export default function template(title, initialState = {}, content = "") {
  let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                  name="description"
                  content="spaceX launch details"
                />
                <title> ${title} </title>
                <link rel="stylesheet" href="assets/bundle.css">
              </head>
              <body>
                <div class="container">
                   <div id="app" class="wrap-inner">
                      ${content}
                   </div>
                </div>
                <script>
                    window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="assets/client.js"></script>
              </body>
              `;

  return page;
}
