
from bottle import route, get, run
import bottle as b


@route('/')
def index():
    return b.template("memory.html")


@get('/css/<filename:re:.*\.css>')
def stylesheets(filename):
    return b.static_file(filename, root="css")


@get('/js/<filename:re:.*\.js>')
def javascript(filename):
    return b.static_file(filename, root="js")


@get('/images/<filename:re:.*\.jpg>')
def javascript(filename):
    return b.static_file(filename, root="images")


@get('/music/<filename:re:.*\.mp3>')
def javascript(filename):
    return b.static_file(filename, root="music")


def main():
    run(host="localhost", port=7000)


if __name__ == "__main__":
    main()
