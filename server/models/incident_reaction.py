from .extensions import db
from datetime import datetime

class IncidentReaction(db.Model):
    __tablename__ = 'incident_reactions'

    id = db.Column(db.Integer, primary_key=True)
    reaction_type = db.Column(db.String(20), nullable=False)  # 'like', 'share'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'reaction_type': self.reaction_type,
            'created_at': self.created_at.isoformat(),
            'user_id': self.user_id,
            'incident_id': self.incident_id
        }