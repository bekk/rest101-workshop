function norwegianRoundFromEnglish(name) {
    switch(name) {
        case 'Group A':
            return 'Gruppe A';
        case 'Group B':
            return 'Gruppe B';
        case 'Group C':
            return 'Gruppe C';
        case 'Group D':
            return 'Gruppe D';
        case 'Group E':
            return 'Gruppe E';
        case 'Group F':
            return 'Gruppe F';
        case 'Group G':
            return 'Gruppe G';
        case 'Group H':
            return 'Gruppe H';
        case 'Round of 16':
            return '16-delsfinale';
        case 'Round of 8':
            return '8-delsfinale';
        case 'Quarter-finals':
            return 'Kvartfinale';
        case 'Semi-finals':
            return 'Kvartfinale';
        case 'Third place play-off':
            return 'Bronsefinale';
        case 'Final':
            return 'Finale';
        default:
            return 'Ukjent runde';
    }
}

export {norwegianRoundFromEnglish};