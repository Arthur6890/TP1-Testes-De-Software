import os

tasks = []
task_categories = {}
archived_tasks = []

def add_task():
    task = input("Digite a tarefa que deseja adicionar: ")
    tasks.append(task)
    save_tasks()

def list_tasks():
    for i, task in enumerate(tasks, 1):
        print(f"{i}. {task}")

def complete_task():
    list_tasks()
    task_index = int(input("Digite o número da tarefa concluída: ")) - 1
    if 0 <= task_index < len(tasks):
        del tasks[task_index]
        save_tasks()
    else:
        print("Número de tarefa inválido.")

def edit_task():
    list_tasks()
    task_index = int(input("Digite o número da tarefa que deseja editar: ")) - 1
    if 0 <= task_index < len(tasks):
        new_task = input("Digite a nova descrição da tarefa: ")
        tasks[task_index] = new_task
        save_tasks()
    else:
        print("Número de tarefa inválido.")

def clear_tasks():
    confirmation = input("Tem certeza de que deseja apagar todas as tarefas? (S/N): ")
    if confirmation.lower() == "s":
        tasks.clear()
        save_tasks()
        print("Todas as tarefas foram apagadas.")

def save_tasks():
    with open("data/tasks.txt", "w") as file:
        for task in tasks:
            file.write(task + "\n")

def load_tasks():
    if os.path.exists("data/tasks.txt"):
        with open("data/tasks.txt", "r") as file:
            for line in file:
                tasks.append(line.strip())





