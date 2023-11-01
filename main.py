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
			elif choice == "8":
					task_manager.list_tasks_by_due_date()
			elif choice == "9":
					task_manager.add_task_with_category()
			elif choice == "10":
					task_manager.list_tasks_by_category()
			elif choice == "11":
					keyword = input("Digite a palavra-chave para pesquisa: ")
					task_manager.search_tasks(keyword)
			elif choice == "12":
					task_manager.archive_task(int(input("Digite o número da tarefa que deseja arquivar: ")) - 1)
			elif choice == "13":
					task_manager.list_archived_tasks()
			elif choice == "14":
					export_filename = input("Digite o nome do arquivo de exportação: ")
					task_manager.export_tasks(export_filename)
			elif choice == "15":
					import_filename = input("Digite o nome do arquivo de importação: ")
					task_manager.import_tasks(import_filename)
			elif choice == "16":
					task_manager.add_recurring_task()
			elif choice == "17":
					task_manager.list_recurring_tasks()
			elif choice == "18":
					statistics = task_manager.generate_statistics()
					for stat, value in statistics.items():
							print(f"{stat}: {value}")
			elif choice == "19":
					task_manager.reorder_tasks()
			elif choice == "20":
					task_index = int(input("Digite o número da tarefa à qual deseja adicionar um marcador: ")) - 1
					label = input("Digite o marcador a ser adicionado: ")
					task_manager.add_label_to_task(task_index, label)
			elif choice == "21":
					label = input("Digite o marcador para listar tarefas: ")
					task_manager.list_tasks_by_label(label)
			elif choice == "22":
					export_filename = input("Digite o nome do arquivo CSV para exportar as tarefas: ")
					task_manager.export_tasks_csv(export_filename)
					print(f"Tarefas exportadas para {export_filename}.")
			elif choice == "23":
					export_filename = input("Digite o nome do arquivo JSON para exportar as tarefas: ")
					task_manager.export_tasks_json(export_filename)
					print(f"Tarefas exportadas para {export_filename}.")
			elif choice == "0":
					break
			else:
					print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    main()
