from flask_frozen import Freezer


# instead of "filename," below, use the name of the file that
# runs YOUR Flask app - omit .py from the filename
from app import app

freezer = Freezer(app)


if __name__ == '__main__':
    freezer.freeze()