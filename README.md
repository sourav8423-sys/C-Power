def c_power_logic(input_value):
    """
    C-Power Core: 3-6-9 Logic
    3: अज्ञान (Input/Noise)
    6: ज्ञान (Processing/Logic)
    9: मैं ही हूँ (Ultimate Truth/Digital Root)
    """
    
    print(f"--- C-Power Initialization ---")
    print(f"[3] अज्ञान (Input): {input_value}")
    
    # संख्या को अंकों में बदलकर जोड़ना (Processing/Gyan)
    def get_digital_root(n):
        print(f"[6] ज्ञान (Processing): Analyzing the frequency of {n}...")
        if n == 0:
            return 0
        # डिजिटल रूट का गणितीय सूत्र (9 का नियम)
        root = n % 9
        return 9 if root == 0 else root

    # परिणाम (Saty/9)
    result = get_digital_root(input_value)
    
    print(f"[9] मैं ही हूँ (The Truth): Result is {result}")
    
    if result == 9:
        print("सिद्धि: यह संख्या पूर्णता (9) का हिस्सा है।")
    else:
        print(f"सिद्धि: यह {result} के माध्यम से 9 की ओर अग्रसर है।")
    
    return result

# आपकी DOB (26061997) के साथ परीक्षण
print("--- Testing with your DOB 26/06/1997 ---")
my_dob = 26061997
c_power_logic(my_dob)

print("\n--- Testing with a Random Number ---")
c_power_logic(12345)
