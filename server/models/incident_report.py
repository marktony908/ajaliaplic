from .extensions import db
from datetime import datetime

class IncidentReport(db.Model):
    __tablename__ = 'incident_reports'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='pending')  # pending, under investigation, rejected, resolved
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    images = db.relationship('IncidentImage', backref='incident', lazy=True, cascade='all, delete-orphan')
    videos = db.relationship('IncidentVideo', backref='incident', lazy=True, cascade='all, delete-orphan')
    comments = db.relationship('IncidentComment', backref='incident', lazy=True, cascade='all, delete-orphan')
    reactions = db.relationship('IncidentReaction', backref='incident', lazy=True, cascade='all, delete-orphan')
    reviews = db.relationship('IncidentReview', backref='incident', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'user': self.user.to_dict(),
            'images': [image.to_dict() for image in self.images],
            'videos': [video.to_dict() for video in self.videos],
            'comments': [comment.to_dict() for comment in self.comments],
            'reactions': {
                'like': len([r for r in self.reactions if r.reaction_type == 'like']),
                'share': len([r for r in self.reactions if r.reaction_type == 'share'])
            },
            'reviews': [review.to_dict() for review in self.reviews]
        }