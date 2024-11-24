from flask_sqlalchemy import SQLAlchemy
from flask_session import Session

# Initialize extensions
db = SQLAlchemy()
server_session = Session()

# Export both extensions
__all__ = ['db', 'server_session']