import random, time

class MentalMath:
	# a and b are randomly generated two digit numbers 
	a = 0
	b = 0	
	op = 0 # randomly selects the type of operation to perform. 0 is addition and 1 and subtraction
	score = 0 # the score at the end of the game. Each correct answer scores 1 point
	t0 = 0 # the time at the start of the game. Used in calculating the elapsed time
	t = 60 # the time limit of answering the questions
	
	# generates and assigns randomly selected values for a, b and op
	def rand(self):
		self.a = int(random.randint(0, 100))
		self.b = int(random.randint(0, 100))
		self.op = int(random.randint(0, 1))
	
	def add(self):
		return self.a + self.b
	
	def subtract(self):
		return self.a - self.b
		
	# determines the type of operation to perform and compares user's answer with real answer
	def check(self, user_ans, op):
		if (op == 0):
			ans = self.add()
		else:
			ans = self.subtract();

		if(user_ans == ans):
			return True;
		else:
			return False
	
	# the game procedure which handles user input, displays questions to the user and calculates score
	def game(self):
		self.rand()
		if self.op == 0:
			print self.a, "+", self.b
		else:
			print self.a, "-", self.b
		user_ans = raw_input(">> ")
		if (time.time() - self.t0) <= self.t:
			if self.check(int(user_ans), self.op):
				print "Excellent! Correct answer"
				self.score = self.score + 1
			else:
				print "Incorrect!"
		else:
			print ""
			print "Your time is up!"
	
	#the construtor
	def __init__(self):
		self.t0 = time.time()
		elapsed = 0
		while(elapsed <= self.t): #the loop holds until time elapsed equals time limit (self.t)
			self.game()
			elapsed = time.time() - self.t0

		print ""
		print "Congratulations! Your score is", self.score

print "Mental Maths v1.0"
print "Play to enhance your mental arithmetic calculation"
print ""
game = MentalMath() #initialize the game
