import os

tasks = []
task_categories = {}
archived_tasks = []
recurring_tasks = []

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

# Função para definir a prioridade de uma tarefa
def set_priority(task_index, priority):
    if 0 <= task_index < len(tasks):
        tasks[task_index] = f"({priority}) {tasks[task_index]}"
        save_tasks()
    else:
        print("Número de tarefa inválido.")


# Função para listar tarefas por prioridade
def list_tasks_by_priority():
    priority_tasks = [(i, task) for i, task in enumerate(tasks)]
    priority_tasks.sort(key=lambda x: x[1])
    for i, (task_index, task) in enumerate(priority_tasks, 1):
        print(f"{i}. {task}")


# Função para adicionar uma tarefa com data de vencimento
def add_task_with_due_date():
    task = input("Digite a tarefa que deseja adicionar: ")
    due_date = input("Digite a data de vencimento (formato: AAAA-MM-DD): ")
    tasks.append(f"{due_date} {task}")
    save_tasks()


# Função para listar tarefas por data de vencimento
def list_tasks_by_due_date():
    due_date_tasks = [(i, task) for i, task in enumerate(tasks)]
    due_date_tasks.sort(key=lambda x: x[1])
    for i, (task_index, task) in enumerate(due_date_tasks, 1):
        print(f"{i}. {task}")


# Função para adicionar uma tarefa com categoria
def add_task_with_category():
    task = input("Digite a tarefa que deseja adicionar: ")
    category = input("Digite a categoria da tarefa: ")
   
    if category not in task_categories:
        task_categories[category] = []
   
    task_categories[category].append(task)
    save_tasks()


# Função para listar tarefas por categoria
def list_tasks_by_category():
    for category, tasks in task_categories.items():
        print(f"\nCategoria: {category}")
        for i, task in enumerate(tasks, 1):
            print(f"{i}. {task}")


# Função para pesquisar tarefas com base em uma palavra-chave
def search_tasks(keyword):
    matching_tasks = [task for task in tasks if keyword in task]
    if matching_tasks:
        print("Tarefas encontradas com a palavra-chave:")
        for i, task in enumerate(matching_tasks, 1):
            print(f"{i}. {task}")
    else:
        print("Nenhuma tarefa encontrada com a palavra-chave.")


# Função para arquivar uma tarefa
def archive_task(task_index):
    if 0 <= task_index < len(tasks):
        archived_task = tasks.pop(task_index)
        archived_tasks.append(archived_task)
        save_tasks()
        print("Tarefa arquivada com sucesso.")
    else:
        print("Número de tarefa inválido.")


# Função para listar tarefas arquivadas
def list_archived_tasks():
    for i, archived_task in enumerate(archived_tasks, 1):
        print(f"{i}. {archived_task}")


# Função para exportar tarefas para um arquivo
def export_tasks(filename):
    with open(filename, "w") as file:
        for task in tasks:
            file.write(task + "\n")
    print(f"Tarefas exportadas para {filename}")


# Função para importar tarefas de um arquivo
def import_tasks(filename):
    try:
        with open(filename, "r") as file:
            imported_tasks = file.readlines()
            tasks.extend(imported_tasks)
        print(f"Tarefas importadas de {filename}")
    except FileNotFoundError:
        print("Arquivo não encontrado.")

# Função para adicionar uma tarefa recorrente
def add_recurring_task():
    task = input("Digite a tarefa que deseja adicionar: ")
    interval = int(input("Digite o intervalo em dias para repetição: "))
    recurring_tasks.append((task, interval))
    save_tasks()

# Função para listar tarefas recorrentes
def list_recurring_tasks():
    for i, (task, interval) in enumerate(recurring_tasks, 1):
        print(f"{i}. {task} (Repete a cada {interval} dias)")

# Função para verificar e adicionar tarefas recorrentes
def check_and_add_recurring_tasks():
    import datetime

    today = datetime.date.today()
    for task, interval in recurring_tasks:
        if not tasks or (today - datetime.datetime.strptime(tasks[-1].split(" ", 1)[0], "%Y-%m-%d").date()).days >= interval:
            tasks.append(f"{today} {task}")
            save_tasks()

# Função para gerar estatísticas
def generate_statistics():
    completed_tasks = [task for task in tasks if task.startswith("(Concluída)")]
    total_tasks = len(tasks)
    total_completed = len(completed_tasks)
    completion_percentage = (total_completed / total_tasks) * 100 if total_tasks > 0 else 0

    return {
        "Total de Tarefas": total_tasks,
        "Tarefas Concluídas": total_completed,
        "Porcentagem de Conclusão": f"{completion_percentage:.2f}%"
    }

# Função para reordenar tarefas
def reorder_tasks():
    while True:
        list_tasks()
        from_index = int(input("Digite o número da tarefa que deseja mover: ") - 1)
        if 0 <= from_index < len(tasks):
            to_index = int(input("Digite a posição para mover a tarefa: ") - 1)
            if 0 <= to_index < len(tasks):
                task_to_move = tasks.pop(from_index)
                tasks.insert(to_index, task_to_move)
                save_tasks()
                print("Tarefa movida com sucesso.")
            else:
                print("Posição inválida. Tente novamente.")
        else:
            print("Número de tarefa inválido. Tente novamente.")
        another = input("Deseja mover outra tarefa? (S/N): ")
        if another.lower() != "s":
            break










