# C-Power Core Logic: Numbers & Names Transformation
# 3: अज्ञान (Input), 6: ज्ञान (Process), 9: मैं ही हूँ (Truth)

def get_digital_root(n):
    """किसी भी अंक को 9 के अंतिम सत्य तक पहुँचाना"""
    if n == 0: return 0
    root = n % 9
    return 9 if root == 0 else root

def analyze_name_frequency(name):
    """नाम की ऊर्जा को 3-6-9 के स्केल पर सिद्ध करना"""
    name = name.upper()
    # अज्ञान (3): अक्षरों को अंकों में बदलना (A=1, B=2...)
    char_values = [(ord(char) - 64) for char in name if char.isalpha()]
    total_sum = sum(char_values)
    
    print(f"\n--- अवस्था 3: अज्ञान (Noise) ---")
    print(f"नाम: {name} | कुल ऊर्जा अंक: {total_sum}")
    
    # ज्ञान (6): सत्य की खोज और विश्लेषण
    truth_9 = get_digital_root(total_sum)
    print(f"--- अवस्था 6: ज्ञान (Logic) ---")
    print(f"विश्लेषण: ब्रह्मांड की आवृत्ति (Frequency) जाँची जा रही है...")
    
    # सत्य (9): मैं ही हूँ (The Ultimate 9)
    print(f"--- अवस्था 9: मैं ही हूँ (Truth) ---")
    print(f"सिद्धि: '{name}' का अंतिम सत्य अंक {truth_9} है।")
    
    return truth_9

if __name__ == "__main__":
    # अपना या किसी का भी नाम यहाँ चेक करें
    test_name = "SOURAV" 
    analyze_name_frequency(test_name)
    
    # जन्मतिथि का परीक्षण (Numbers)
    dob_sum = 26061997
    print(f"\nजन्मतिथि का सत्य: {get_digital_root(dob_sum)}")
