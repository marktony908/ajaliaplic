from .extensions import db
from datetime import datetime

class IncidentReview(db.Model):
    __tablename__ = 'incident_reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'user': self.user.to_dict(),
            'incident_id': self.incident_id
        }