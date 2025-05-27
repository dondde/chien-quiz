 🐶 ChienQuiz

Un quiz interactif en ligne sur les races de chiens, développé avec React Django REST Framework, Djoser et The Dog API.

---

Fonctionnalités

- Authentification (inscription / connexion) via JWT
- Intégration de TheDogAPI pour afficher des images de chiens
- Quiz aléatoire avec 10 questions (score final enregistré)
- Interface utilisateur avec Bootstrap
- Minuteur par question (10 sec) et sons pour bonne/mauvaise réponse
- Historique des scores par utilisateur
- Documentation API avec Swagger

---

 Technologies

Frontend :  React + Axios ,  Bootstrap  ,  React Router 

Backend    : Django REST + Djoser , SQLite (dev)  , DRF-YASG (Swagger) 

---

Installation locale : Cloner le dépôt

```bash
git clone https://github.com/<ton-user>/chien-quiz.git
cd chien-quiz


backend 
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

frontend
cd frontend
npm install
npm start

