____________ IPL Dashboard ____________

---------------- Features ------------------------

1. Matches per Year: Number of matches played per year in IPL.
2. Matches Won Stacked: Stacked bar chart of matches won by all teams over all seasons.
3. Extra Runs: Extra runs conceded per team for a selected year.
4. Top Bowlers: Top economical bowlers for a selected year.
5. Matches Played vs Won: Matches played vs matches won for each team in a selected year.

------------ Tech Stack -----------------------

Backend: Django REST Framework, SQLite
Frontend: ReactJS, Bootstrap 5, Google Charts
Data: IPL dataset from [Kaggle](https://www.kaggle.com/manasgarg/ipl)

------------ Setup ------------------

1. Clone the repo:
   ``bash
   git clone <repo_url>
   cd <repo_folder>

2. Install backend dependencies and run Django server:

  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver

3. Install frontend dependencies and start React app:

  cd frontend
  npm install
  npm start
