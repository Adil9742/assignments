import csv
from django.core.management.base import BaseCommand
from ipl_api.models import Match, Delivery
from datetime import datetime

class Command(BaseCommand):
    help = 'Load IPL data from CSV files into the database'

    def handle(self, *args, **kwargs):
        matches_path = 'ipl_api/data/matches.csv'
        deliveries_path = 'ipl_api/data/deliveries.csv'

        self.stdout.write("Loading Matches...")
        with open(matches_path, encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Match.objects.get_or_create(
                    id=row['id'],
                    season=row['season'],
                    city=row.get('city'),
                    date=datetime.strptime(row['date'], '%Y-%m-%d'),
                    team1=row['team1'],
                    team2=row['team2'],
                    toss_winner=row['toss_winner'],
                    toss_decision=row['toss_decision'],
                    result=row['result'],
                    dl_applied=bool(int(row['dl_applied'])),
                    winner=row.get('winner'),
                    win_by_runs=row['win_by_runs'],
                    win_by_wickets=row['win_by_wickets'],
                    player_of_match=row.get('player_of_match'),
                    venue=row['venue']
                )
        self.stdout.write(self.style.SUCCESS(" Matches loaded successfully!"))

        self.stdout.write("Loading Deliveries...")
        with open(deliveries_path, encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                try:
                    match = Match.objects.get(id=row['match_id'])
                    Delivery.objects.create(
                        match=match,
                        inning=row['inning'],
                        batting_team=row['batting_team'],
                        bowling_team=row['bowling_team'],
                        over=row['over'],
                        ball=row['ball'],
                        batsman=row['batsman'],
                        non_striker=row['non_striker'],
                        bowler=row['bowler'],
                        is_super_over=bool(int(row['is_super_over'])),
                        wide_runs=row['wide_runs'],
                        bye_runs=row['bye_runs'],
                        legbye_runs=row['legbye_runs'],
                        noball_runs=row['noball_runs'],
                        penalty_runs=row['penalty_runs'],
                        batsman_runs=row['batsman_runs'],
                        extra_runs=row['extra_runs'],
                        total_runs=row['total_runs'],
                        player_dismissed=row.get('player_dismissed') or None,
                        dismissal_kind=row.get('dismissal_kind') or None,
                        fielder=row.get('fielder') or None
                    )
                except Match.DoesNotExist:
                    continue
        self.stdout.write(self.style.SUCCESS(" Deliveries loaded successfully!"))
