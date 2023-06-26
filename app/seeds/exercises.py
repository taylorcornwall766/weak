from sqlalchemy.sql import text
from app.models.exercises import Exercise
from app.models.db import db, environment, SCHEMA

def seed_exercises():
    exercise1 = Exercise(
        author_id = 1,
        name = "bicep curl",
        primary_muscle = "bicep",
        description = "From a resting position with your arms straight down at your side exhale and slowly bend each elbow in unison, bringing the dumbbells towards your chest without arching your back or moving your elbows forward. Maintain a neutral wrist position (avoid flexion and extension of your wrists)."
    )
    exercise2 = Exercise(
        author_id = 1,
        name = "lateral raise",
        primary_muscle = "shoulder",
        description = "From resting position with your arms straight down at your side exhale and slowly raise each arm in unison directly out to your side, bringing the dumbbells towards the ceiling without arching your back or bending your elbows. Maintain a neutral wrist position (avoid flexion and extension of your wrists) and avoid swinging the weight and using momentum."
    )
    exercise3 = Exercise(
        author_id = 1,
        name = "hammer curl",
        primary_muscle = "bicep",
        description = "From resting position exhale and slowly bend each elbow in unison, bringing the dumbbells towards your chest without arching your back or moving your elbows forward. Maintain a neutral wrist position (avoid flexion and extension of your wrists)"
    )
    exercise4 = Exercise(
        author_id=1,
        name="Chest Press",
        primary_muscle="chest",
        description="Lie on a flat bench, hold the dumbbells above your chest with your palms facing forward. Exhale and push the dumbbells up until your arms are fully extended, then lower them back down to the starting position."
    )

    exercise5 = Exercise(
        author_id=1,
        name="Shoulder Press",
        primary_muscle="shoulder",
        description="Sit on a bench with the dumbbells held at shoulder height, palms facing forward. Exhale and push the dumbbells upward until your arms are fully extended, then lower them back down to the starting position."
    )
    exercise6 = Exercise(
        author_id=1,
        name="Tricep Dip",
        primary_muscle="tricep",
        description="Position your hands shoulder-width apart on a stable surface, such as parallel bars or the edge of a bench. Lower your body by bending your elbows until your upper arms are parallel to the ground, then press back up to the starting position."
    )

    exercise7 = Exercise(
        author_id=1,
        name="Bench Press",
        primary_muscle="chest",
        description="Lie on a flat bench, hold the barbell with an overhand grip slightly wider than shoulder-width apart. Lower the barbell to your chest, then press it back up to the starting position."
    )

    exercise8 = Exercise(
        author_id=1,
        name="Dumbbell Row",
        primary_muscle="upperback",
        description="Place one knee and hand on a bench, grasp a dumbbell with your other hand. Pull the dumbbell up to your side while keeping your back flat, then lower it back down to the starting position."
    )

    exercise9 = Exercise(
        author_id=1,
        name="Squat",
        primary_muscle="quads",
        description="Stand with your feet shoulder-width apart, lower your body by bending your knees and hips, then push through your heels to return to the starting position."
    )

    exercise10 = Exercise(
        author_id=1,
        name="Romanian Deadlift",
        primary_muscle="hamstring",
        description="Hold a barbell with an overhand grip in front of your thighs, slightly bend your knees and hinge forward at your hips. Lower the barbell towards the ground while keeping your back flat, then return to the starting position by squeezing your glutes and extending your hips."
    )
    exercise11 = Exercise(
    author_id=1,
    name="Calf Raise",
    primary_muscle="calves",
    description="Stand with the balls of your feet on an elevated surface, such as a step. Rise up onto your toes by extending your ankles as high as possible, then lower your heels back down to the starting position."
    )

    exercise12 = Exercise(
        author_id=1,
        name="Russian Twist",
        primary_muscle="core",
        description="Sit on the ground with your knees bent and feet lifted. Hold a weight or medicine ball with both hands and twist your torso from side to side, touching the weight to the ground on each side."
    )

    exercise13 = Exercise(
        author_id=1,
        name="Push-up",
        primary_muscle="chest",
        description="Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body by bending your elbows, then push back up to the starting position."
    )

    exercise14 = Exercise(
        author_id=1,
        name="Walking Lunges",
        primary_muscle="quads",
        description="Step forward with one leg and lower your body until both knees are bent at 90-degree angles. Push off with your forward leg to step into the next lunge, alternating legs as you walk forward."
    )

    exercise15 = Exercise(
        author_id=1,
        name="Plank",
        primary_muscle="core",
        description="Start in a push-up position with your forearms on the ground. Keep your body in a straight line from head to heels and hold this position for a specified time."
    )
    exercise17 = Exercise(
        author_id=1,
        name="Leg Press",
        primary_muscle="quads",
        secondary_muscle="hamstring",
        description="Sit on a leg press machine with your feet shoulder-width apart on the footplate. Push the footplate away by extending your knees and hips, then slowly lower it back down to the starting position."
    )

    exercise18 = Exercise(
        author_id=1,
        name="Seated Calf Raise",
        primary_muscle="calves",
        description="Sit on a calf raise machine with your feet on the footplate and your knees bent. Raise your heels as high as possible by extending your ankles, then lower them back down to the starting position."
    )

    exercise19 = Exercise(
        author_id=1,
        name="Side Plank",
        primary_muscle="core",
        description="Lie on your side with your forearm on the ground, elbow directly under your shoulder. Lift your hips and knees off the ground, forming a straight line from head to feet. Hold this position for a specified time, then switch sides."
    )

    exercise20 = Exercise(
        author_id=1,
        name="Dumbbell Shoulder Press",
        primary_muscle="shoulder",
        description="Stand with your feet shoulder-width apart and hold a dumbbell in each hand at shoulder level. Press the dumbbells overhead by extending your arms, then lower them back down to the starting position."
    )

    db.session.add(exercise1)
    db.session.add(exercise2)
    db.session.add(exercise3)
    db.session.add(exercise4)
    db.session.add(exercise5)
    db.session.add(exercise6)
    db.session.add(exercise7)
    db.session.add(exercise8)
    db.session.add(exercise9)
    db.session.add(exercise10)
    db.session.add(exercise11)
    db.session.add(exercise12)
    db.session.add(exercise13)
    db.session.add(exercise14)
    db.session.add(exercise15)
    db.session.add(exercise17)
    db.session.add(exercise18)
    db.session.add(exercise19)
    db.session.add(exercise20)
    db.session.commit()

def undo_exercises():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))

    db.session.commit()
