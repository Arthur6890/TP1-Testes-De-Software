from src import task_manager

def main():
		task_manager.load_tasks()
		while True:
			print("\nSistema de Tarefas")
			print("1. Adicionar Tarefa")
			print("2. Listar Tarefas")
			print("3. Marcar Tarefa como Concluída")
			print("4. Editar Tarefa")
			print("5. Limpar Tarefas")
			print("6. Sair")
			choice = input("Escolha uma opção: ")
			if choice == "1":
					task_manager.add_task()
			elif choice == "2":
					task_manager.list_tasks()
			elif choice == "3":
					task_manager.complete_task()
			elif choice == "4":
					task_manager.edit_task()
			elif choice == "5":
					task_manager.clear_tasks()
			elif choice == "6":
					task_index = int(input("Digite o número da tarefa que deseja priorizar: ")) - 1
					priority = input("Digite a prioridade (alta, média, baixa): ")
					task_manager.set_priority(task_index, priority)
			elif choice == "7":
					task_manager.list_tasks_by_priority()
			elif choice == "11111":
					break
			else:
					print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    main()
