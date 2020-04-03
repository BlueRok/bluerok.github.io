try: # Python 2
	import Tkinter as tk 
	import tkFont as font
except ImportError: # Python 3
	import tkinter as tk
	import tkinter.font as font

def run():
	numConnLabel['text'] = "Run Clicked"

def kill():
	numConnLabel['text'] = "Kill Clicked"

def view():
	numConnLabel['text'] = "View Clicked"
	viewConnWindow = tk.TopLevel(root)

root = tk.Tk()
root.title("Server")
SCREEN_WIDTH = int(root.winfo_screenwidth() / 2)
SCREEN_HEIGHT = int(root.winfo_screenheight())
root.geometry(str(SCREEN_WIDTH) + "x" + str(SCREEN_HEIGHT))
root.minsize(150, 150) # Change later
root.grid_columnconfigure(0, weight=1)

FRAME_FONT = font.Font(family="Helvetica", size=25)
BUTTON_FONT = font.Font(family="Helvetica", size=15)
LABEL_FONT = font.Font(family="Helvetica", size=20)

soFrame = tk.LabelFrame(root, text="Server Options", font=FRAME_FONT, bd=1, relief=tk.GROOVE)
soFrame.grid(row=0, column=0)

soButtonPadX, soButtonPadY = (20, 10), 10
runButton = tk.Button(soFrame, text="Run Server", font=BUTTON_FONT, command=run)
runButton.grid(row=0, column=0, padx=soButtonPadX, pady=soButtonPadY)

killButton = tk.Button(soFrame, text="Kill Server", font=BUTTON_FONT, command=kill)
killButton.grid(row=0, column=1, padx=soButtonPadX[::-1], pady=soButtonPadY)

connFrame = tk.LabelFrame(root, text="Connections", font=FRAME_FONT, bd=1, relief=tk.GROOVE)
connFrame.grid(row=1, column=0, sticky="nesw")
connFrame.grid_columnconfigure(0, weight=1)
connFrame.grid_columnconfigure(1, weight=1)

numConnLabel = tk.Label(connFrame, text="Number of connections: 0", font=LABEL_FONT)
numConnLabel.grid(row=0, column=0, sticky="e")

viewConnButton = tk.Button(connFrame, text="View", font=BUTTON_FONT, command=view)
viewConnButton.grid(row=0, column=1, sticky="w")

connTextArea = tk.Text(connFrame, height=2, width=10)
connTextArea.grid(row=1, column=0, columnspan=2, sticky="nesw")

tk.mainloop()
