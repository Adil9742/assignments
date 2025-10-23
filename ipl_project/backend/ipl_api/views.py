from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg
from .models import Match, Delivery

@api_view(['GET'])
def matches_per_year(request):
    data = (
        Match.objects
        .values('season')
        .annotate(total_matches=Count('id'))
        .order_by('season')
    )
    return Response(list(data))

@api_view(['GET'])
def matches_won_per_team(request):
    data = (
        Match.objects
        .values('season', 'winner')
        .annotate(wins=Count('winner'))
        .exclude(winner__isnull=True)
        .order_by('season')
    )
    return Response(list(data))

@api_view(['GET'])
def extra_runs_by_team(request, year=None):
   
    matches = Match.objects.filter(season=year) if year else Match.objects.all()

    extra_runs_data = (
        Delivery.objects
        .filter(match__in=matches)
        .values('bowling_team', 'match__season')
        .annotate(extra_runs=Sum('extra_runs'))
        .order_by('bowling_team')
    )

    return Response(list(extra_runs_data))

@api_view(['GET'])
def economical_bowlers(request, year=None):
   
    matches = Match.objects.filter(season=year) if year else Match.objects.all()

    data = (
        Delivery.objects
        .filter(match__in=matches)
        .values('bowler')
        .annotate(
            total_runs=Sum('total_runs'),
            total_balls=Count('id')
        )
    )

    result = []
    for d in data:
        overs = d['total_balls'] / 6
        economy = round(d['total_runs'] / overs, 2) if overs > 0 else 0
        result.append({'bowler': d['bowler'], 'economy': economy})

    top_bowlers = sorted(result, key=lambda x: x['economy'])[:10]
    return Response(top_bowlers)


@api_view(['GET'])
def matches_played_vs_won(request, year=None):
    
    matches = Match.objects.filter(season=year) if year else Match.objects.all()

    teams = set(matches.values_list('team1', flat=True)) | set(matches.values_list('team2', flat=True))

    result = []
    for team in teams:
        played = matches.filter(team1=team).count() + matches.filter(team2=team).count()
        won = matches.filter(winner=team).count()
        result.append({'team': team, 'played': played, 'won': won})

    return Response(result)

